import { DashBoardCardProps } from "@/models/definition"

export const DashboardCard = ({ dashBoardCard } : { dashBoardCard: DashBoardCardProps }) => {
    return(
        <>
            <div className="bg-slate-900 py-5 text-center rounded-xl">
                <h1 className="text-white font-black text-xl md:text-4xl">{dashBoardCard.name}</h1>
                <p className="text-white my-7 text-3xl">{dashBoardCard.totalCount}</p>
            </div>
        </>
    )
}