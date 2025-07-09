
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { VisitorsChart } from "../components/visitors-chart";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50 dark:bg-blue-950">
      <header className="w-full bg-blue-600 text-white py-6 px-8 shadow-md">
        <h1 className="text-3xl font-bold">Acme Inc.</h1>
      </header>
      <main className="flex-1 flex flex-col md:flex-row gap-8 p-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:bg-blue-900 rounded-lg shadow p-4 mb-8 md:mb-0">
          <nav className="flex flex-col gap-2">
            <Button variant="outline" className="justify-start w-full">Quick Create</Button>
            <Button variant="ghost" className="justify-start w-full">Dashboard</Button>
            <Button variant="ghost" className="justify-start w-full">Lifecycle</Button>
            <Button variant="ghost" className="justify-start w-full">Analytics</Button>
            <Button variant="ghost" className="justify-start w-full">Projects</Button>
            <Button variant="ghost" className="justify-start w-full">Team</Button>
          </nav>
        </aside>
        {/* Main Content */}
        <section className="flex-1 flex flex-col gap-8">
          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,250.00</div>
                <div className="text-xs text-blue-700 dark:text-blue-200">Trending up this month</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-xs text-blue-700 dark:text-blue-200">Down 20% this period</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,678</div>
                <div className="text-xs text-blue-700 dark:text-blue-200">Strong user retention</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Growth Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.5%</div>
                <div className="text-xs text-blue-700 dark:text-blue-200">Steady performance increase</div>
              </CardContent>
            </Card>
          </div>
          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Total Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <VisitorsChart />
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="w-full text-center py-4 text-blue-700 dark:text-blue-200 bg-blue-100 dark:bg-blue-900">
        &copy; {new Date().getFullYear()} Acme Inc.
      </footer>
    </div>
  );
}
