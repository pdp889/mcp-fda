import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

interface ToolResponse {
  content: Array<{ type: string; text: string }>;
  _meta?: {
    total: number;
    limit: number;
    skip: number;
  };
  error?: string;
}

class TestRunner {
  private serverProcess: any;
  private client: Client;

  constructor() {
    this.client = new Client({
      name: 'FDATestClient',
      version: '1.0.0',
    });
  }

  async startServer(): Promise<void> {
    const distPath = path.join(process.cwd(), 'dist', 'index.js');
    console.log('Starting server...');

    this.serverProcess = spawn('node', [distPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'test' },
    });

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Server failed to start within timeout'));
      }, 15000);

      this.serverProcess.stdout.on('data', (data: Buffer) => {
        const output = data.toString();
        console.log(`Server: ${output.trim()}`);
        if (output.includes('Server started')) {
          clearTimeout(timeout);
          resolve();
        }
      });

      this.serverProcess.stderr.on('data', (data: Buffer) => {
        console.error(`Server error: ${data.toString().trim()}`);
      });

      this.serverProcess.on('error', reject);
    });
  }

  async connect(): Promise<void> {
    const distPath = path.join(process.cwd(), 'dist', 'index.js');
    await this.client.connect(
      new StdioClientTransport({
        command: 'node',
        args: [distPath],
      })
    );
  }

  async runTest(testName: string, params: any): Promise<{ success: boolean; error?: Error }> {
    console.log(`\nRunning test: ${testName}`);
    try {
      const result = (await this.client.callTool({
        name: 'search-fda-food-enforcement',
        arguments: params,
      })) as ToolResponse;

      if (result.error) {
        return { success: false, error: new Error(result.error.toString()) };
      }

      if (!result.content?.length) {
        return { success: false, error: new Error('No content in response') };
      }

      if (result.content[0].text.startsWith('Failed to search FDA database:')) {
        return { success: false, error: new Error(result.content[0].text) };
      }

      if (!result._meta) {
        return { success: false, error: new Error('No metadata in response') };
      }

      console.log(`✓ ${testName} passed`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  async cleanup() {
    if (!this.serverProcess) return;

    return new Promise<void>((resolve) => {
      this.serverProcess.once('close', () => resolve());
      this.serverProcess.kill('SIGTERM');

      // Force kill after 5 seconds if still running
      setTimeout(() => {
        if (this.serverProcess) {
          this.serverProcess.kill('SIGKILL');
        }
      }, 5000);
    });
  }
}

async function runAllTests() {
  console.log('\n=== Starting Integration Tests ===\n');
  const runner = new TestRunner();
  const failures: { name: string; error: Error }[] = [];

  try {
    await runner.startServer();
    await runner.connect();

    const tests = [
      {
        name: 'Search with Multiple Fields',
        params: {
          product_type: 'Food',
          city: 'Omaha',
          limit: 1,
        },
      },
      {
        name: 'Search with Sort',
        params: {
          product_type: 'Food',
          sort_field: 'recall_initiation_date',
          sort_direction: 'desc',
          limit: 1,
        },
      },
    ];

    for (const test of tests) {
      const result = await runner.runTest(test.name, test.params);
      if (!result.success && result.error) {
        failures.push({ name: test.name, error: result.error });
      }
    }

    if (failures.length > 0) {
      console.log(`
=== Test Summary ===
Total Tests: ${tests.length}
Passed: ${tests.length - failures.length}
Failed: ${failures.length}

=== Failed Tests ===
${failures.map((failure) => `✗ ${failure.name}:\n  ${failure.error.message}`).join('\n')}`);
      process.exit(1);
    } else {
      console.log('\n=== All Tests Passed Successfully! ===\n');
    }
  } catch (error) {
    console.error('\n=== Test Suite Failed ===');
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  } finally {
    await runner.cleanup();
    process.exit(0); // Add explicit exit for successful completion
  }
}

runAllTests();
