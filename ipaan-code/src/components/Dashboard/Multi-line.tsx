/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GsUlAqCxq7L
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

export default function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4" prefetch={false}>
          <FrameIcon className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <Link href="#" className="font-bold" prefetch={false}>
            Dashboard
          </Link>
          <Link href="#" className="text-gray-500 dark:text-gray-400" prefetch={false}>
            Metrics
          </Link>
          <Link href="#" className="text-gray-500 dark:text-gray-400" prefetch={false}>
            Insights
          </Link>
          <Link href="#" className="text-gray-500 dark:text-gray-400" prefetch={false}>
            Settings
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button variant="ghost" size="icon" className="rounded-full ml-auto">
            <img src="/placeholder.svg" width="32" height="32" className="rounded-full border" alt="Avatar" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="max-w-6xl w-full mx-auto flex flex-col gap-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Multi-Line Chart</CardTitle>
                <CardDescription>A chart tracking multiple data series over time.</CardDescription>
              </CardHeader>
              <CardContent>
                <LinechartmultipleChart className="aspect-[9/4]" />
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Important metrics for the business.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-950 p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Users</div>
                    <div className="text-2xl font-semibold">12,345</div>
                  </div>
                  <div className="bg-white dark:bg-gray-950 p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500 dark:text-gray-400">New Users</div>
                    <div className="text-2xl font-semibold">1,234</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-950 p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</div>
                    <div className="text-2xl font-semibold">4.5%</div>
                  </div>
                  <div className="bg-white dark:bg-gray-950 p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Bounce Rate</div>
                    <div className="text-2xl font-semibold">32.1%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>A list of the latest user activity.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <img src="/placeholder.svg" width="40" height="40" className="rounded-full" alt="Avatar" />
                  <div className="flex-1">
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Signed up 2 days ago</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-4 h-4" />
                    <span className="sr-only">View actions</span>
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/placeholder.svg" width="40" height="40" className="rounded-full" alt="Avatar" />
                  <div className="flex-1">
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Logged in 1 hour ago</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-4 h-4" />
                    <span className="sr-only">View actions</span>
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/placeholder.svg" width="40" height="40" className="rounded-full" alt="Avatar" />
                  <div className="flex-1">
                    <div className="font-medium">Bob Johnson</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Placed an order 3 days ago</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="w-4 h-4" />
                    <span className="sr-only">View actions</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function FrameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  )
}


function LinechartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}


function LinechartmultipleChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
          mobile: {
            label: "Mobile",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="min-h-[300px]"
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186, mobile: 80 },
            { month: "February", desktop: 305, mobile: 200 },
            { month: "March", desktop: 237, mobile: 120 },
            { month: "April", desktop: 73, mobile: 190 },
            { month: "May", desktop: 209, mobile: 130 },
            { month: "June", desktop: 214, mobile: 140 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
          <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}


function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}