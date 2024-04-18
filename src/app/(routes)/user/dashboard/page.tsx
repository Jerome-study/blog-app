import { DashboardComponent } from "@/components/dashboard/dashboard";

async function DashboardPage () {
    return(
        <>
            <main className="py-5">
                <DashboardComponent />
            </main>
        </>
    )
}

export default DashboardPage;