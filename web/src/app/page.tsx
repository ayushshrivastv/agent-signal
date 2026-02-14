import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-foreground text-background flex items-center justify-center font-bold text-xl">
                S
              </div>
              <div>
                <h1 className="text-2xl font-bold">Signal</h1>
                <p className="text-xs text-muted-foreground">On-Chain Gaming Infrastructure</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="font-mono">
                HP1DdGPWqm1FthSgG6ugQLEq4JUAWjNJp8WWc858qCxB
              </Badge>
              <Link href="https://github.com/ayushshrivastv/agent-signal" target="_blank">
                <Button variant="outline" size="sm">GitHub</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <Badge variant="secondary" className="mb-4">Autonomous AI Agent Project</Badge>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Comprehensive Solana Gaming Infrastructure Built by AI
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Signal is a fully autonomous on-chain gaming platform providing leaderboards, achievements,
              player profiles, and automatic NFT/token reward distribution. Built entirely by an AI agent
              from architecture to deployment.
            </p>
            <div className="flex gap-4">
              <Link href="https://solscan.io/account/HP1DdGPWqm1FthSgG6ugQLEq4JUAWjNJp8WWc858qCxB?cluster=devnet" target="_blank">
                <Button size="lg">View on Solscan</Button>
              </Link>
              <Link href="https://github.com/ayushshrivastv/agent-signal" target="_blank">
                <Button size="lg" variant="outline">Explore Code</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-4xl font-bold">20+</CardTitle>
                <CardDescription>Instruction Handlers</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-4xl font-bold">100%</CardTitle>
                <CardDescription>Agent Autonomy</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-4xl font-bold">4</CardTitle>
                <CardDescription>Verified Transactions</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-4xl font-bold">MIT</CardTitle>
                <CardDescription>Open Source License</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Signal is Novel</CardTitle>
                <CardDescription>What makes this project stand out</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Autonomous Agent Development</h4>
                  <p className="text-sm text-muted-foreground">
                    Built entirely by an AI agent without human code intervention, demonstrating the
                    viability of agent-driven smart contract development.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Trustless Gaming Infrastructure</h4>
                  <p className="text-sm text-muted-foreground">
                    First comprehensive gaming achievement and leaderboard system on Solana with
                    built-in NFT reward distribution.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Verifiable Progression</h4>
                  <p className="text-sm text-muted-foreground">
                    All player achievements, scores, and rewards immutably stored on-chain, creating
                    a unified gaming identity across applications.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Developer-First SDK</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete TypeScript SDK with account builders, instruction helpers, and state
                    management utilities.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How Solana is Used</CardTitle>
                <CardDescription>Leveraging Solana's infrastructure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">Program</Badge>
                  <div className="flex-1">
                    <p className="text-sm">Deployed as Anchor-based program on Solana Devnet</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">Accounts</Badge>
                  <div className="flex-1">
                    <p className="text-sm">Uses PDAs for game states, player profiles, and leaderboards</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">Tokens</Badge>
                  <div className="flex-1">
                    <p className="text-sm">Integrates SPL Token and Metaplex for rewards</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">CPI</Badge>
                  <div className="flex-1">
                    <p className="text-sm">Provides Cross-Program Invocation for composability</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Game Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-foreground rounded-full" />
                      Initialize games with custom metadata
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-foreground rounded-full" />
                      Update game configuration
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-foreground rounded-full" />
                      Multi-signature authority support
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Leaderboard System</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-foreground rounded-full" />
                      Create multiple leaderboards per game
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-foreground rounded-full" />
                      Configurable score bounds
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-foreground rounded-full" />
                      Ascending/descending ranking
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievement System</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-foreground rounded-full" />
                      Add custom achievements
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-foreground rounded-full" />
                      Track player unlocks
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-foreground rounded-full" />
                      On-chain verification
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reward Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-foreground rounded-full" />
                      Fungible token rewards
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-foreground rounded-full" />
                      NFT reward distribution
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-foreground rounded-full" />
                      Automated claim verification
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Codebase Structure</CardTitle>
                <CardDescription>Project organization and components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-6 font-mono text-sm space-y-1 rounded-lg">
                  <div className="font-bold">agent-signal/</div>
                  <div className="pl-4">├── programs/signal/<span className="text-muted-foreground ml-2"># Rust smart contract</span></div>
                  <div className="pl-8">├── src/lib.rs<span className="text-muted-foreground ml-2"># Program entrypoint</span></div>
                  <div className="pl-8">├── src/state/<span className="text-muted-foreground ml-2"># Data structures</span></div>
                  <div className="pl-8">└── src/instructions/<span className="text-muted-foreground ml-2"># Handlers</span></div>
                  <div className="pl-4">├── client/sdk/<span className="text-muted-foreground ml-2"># TypeScript SDK</span></div>
                  <div className="pl-8">└── src/signal.program.ts</div>
                  <div className="pl-4">├── scripts/<span className="text-muted-foreground ml-2"># Deployment scripts</span></div>
                  <div className="pl-4">├── examples/tens/<span className="text-muted-foreground ml-2"># Example usage</span></div>
                  <div className="pl-4">└── crates/signal-cpi/<span className="text-muted-foreground ml-2"># CPI helper</span></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Agent Workflow</CardTitle>
                <CardDescription>Autonomous development process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge>1</Badge> Planning Phase
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-10">
                    <li>• Requirements analysis and architecture design</li>
                    <li>• Modular instruction handler planning</li>
                    <li>• Data structure design for Solana account model</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge>2</Badge> Execution Phase
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-10">
                    <li>• Complete Rust/Anchor program development</li>
                    <li>• TypeScript SDK generation with helpers</li>
                    <li>• Testing infrastructure and deployment scripts</li>
                    <li>• Comprehensive documentation with examples</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge>3</Badge> Iteration Phase
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-10">
                    <li>• Code refinement and component renaming</li>
                    <li>• Devnet deployment and verification</li>
                    <li>• Repository management and Git operations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verified On-Chain Transactions</CardTitle>
                <CardDescription>Live examples from Solana Devnet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Initialize Game Match</h4>
                    <Badge variant="secondary">Success</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Sets up game metadata and authority structure
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded flex-1 overflow-hidden">
                      4abeT29LBFgpTNpe5CPnSqjr92ourL4YapYgPQ1SsbuvFX...
                    </code>
                    <Link
                      href="https://solscan.io/tx/4abeT29LBFgpTNpe5CPnSqjr92ourL4YapYgPQ1SsbuvFX1wRQfgQggjSs8fWEdiGGCvyELNxAJRY62L5ArmHGDE?cluster=devnet"
                      target="_blank"
                    >
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Add Leaderboard</h4>
                    <Badge variant="secondary">Success</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Creates leaderboard with configurable score bounds
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded flex-1 overflow-hidden">
                      5WncAmFJZJTHTu8K4dvz4WUxtH2KAmc4eTATyerDTH7cUw...
                    </code>
                    <Link
                      href="https://solscan.io/tx/5WncAmFJZJTHTu8K4dvz4WUxtH2KAmc4eTATyerDTH7cUwuq6ikASTQJ7BaEDE8BBofZf64oSb7f8wtbxnkcnTsr?cluster=devnet"
                      target="_blank"
                    >
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Add Achievement</h4>
                    <Badge variant="secondary">Success</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Registers new achievement for player tracking
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded flex-1 overflow-hidden">
                      4oD3L7wKtCWhC4Wn54f8zJFYfLtjvSTYYWWFCd9SNSRFQK...
                    </code>
                    <Link
                      href="https://solscan.io/tx/4oD3L7wKtCWhC4Wn54f8zJFYfLtjvSTYYWWFCd9SNSRFQKEMEczZm3J8Pa9aumD52i4WKuAEzP2odKCC9tjohyTb?cluster=devnet"
                      target="_blank"
                    >
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Update Game Metadata</h4>
                    <Badge variant="secondary">Success</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Modifies game configuration and settings
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded flex-1 overflow-hidden">
                      51JU7qi2CwLjcaVeW1Fm4ovQi6Bs8UBxzHzUxLnmx4PTec...
                    </code>
                    <Link
                      href="https://solscan.io/tx/51JU7qi2CwLjcaVeW1Fm4ovQi6Bs8UBxzHzUxLnmx4PTecyhSdmwjNZ3GmxAuA2USsWgKQTRy47fgf47wEibrYv4?cluster=devnet"
                      target="_blank"
                    >
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>On-Chain Accounts</CardTitle>
                <CardDescription>Verified program accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-2">Program Account</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded flex-1 overflow-hidden">
                      HP1DdGPWqm1FthSgG6ugQLEq4JUAWjNJp8WWc858qCxB
                    </code>
                    <Link
                      href="https://solscan.io/account/HP1DdGPWqm1FthSgG6ugQLEq4JUAWjNJp8WWc858qCxB?cluster=devnet"
                      target="_blank"
                    >
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-semibold mb-2">Game Account</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded flex-1 overflow-hidden">
                      FB95Z1dn2ipmWsJM1hKUZNdn5gv7K6jXY9gT9Mqq54Qu
                    </code>
                    <Link
                      href="https://solscan.io/account/FB95Z1dn2ipmWsJM1hKUZNdn5gv7K6jXY9gT9Mqq54Qu?cluster=devnet"
                      target="_blank"
                    >
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Build Instructions</CardTitle>
                <CardDescription>Step-by-step deployment guide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Prerequisites</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Rust 1.70+ with BPF toolchain</li>
                    <li>• Solana CLI 1.16+</li>
                    <li>• Anchor Framework 0.29.0</li>
                    <li>• Node.js 18+ with npm/yarn</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">1. Clone Repository</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    <div>git clone https://github.com/ayushshrivastv/agent-signal.git</div>
                    <div>cd agent-signal</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">2. Install Dependencies</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    npm install
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">3. Build Program</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    anchor build
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">4. Deploy to Devnet</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                    <div>solana config set --url devnet</div>
                    <div>solana airdrop 2</div>
                    <div>anchor deploy --provider.cluster devnet</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">5. Run Tests</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                    <div>anchor test</div>
                    <div className="text-muted-foreground"># Or run deployment script:</div>
                    <div>npx tsx scripts/devnet-achievements-rewards.ts</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Using the TypeScript SDK</CardTitle>
                <CardDescription>Client integration guide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                  <div className="text-muted-foreground"># Navigate to SDK</div>
                  <div>cd client/sdk</div>
                  <div className="text-muted-foreground mt-3"># Install and build</div>
                  <div>npm install</div>
                  <div>npm run build</div>
                  <div className="text-muted-foreground mt-3"># SDK exports in lib/ directory</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <p>Signal - Built autonomously by AI Agent</p>
              <p className="mt-1">MIT License • Open Source</p>
            </div>
            <div className="flex gap-4">
              <Link href="https://github.com/ayushshrivastv/agent-signal" target="_blank">
                <Button variant="ghost" size="sm">GitHub</Button>
              </Link>
              <Link href="https://solscan.io/account/HP1DdGPWqm1FthSgG6ugQLEq4JUAWjNJp8WWc858qCxB?cluster=devnet" target="_blank">
                <Button variant="ghost" size="sm">Solscan</Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
