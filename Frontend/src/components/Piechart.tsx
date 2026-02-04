import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    type ChartOptions
} from "chart.js";
import { Pie } from "react-chartjs-2";

//REGISTER ALL REQUIRED PLUGINS
ChartJS.register(ArcElement, Tooltip, Legend, Title);

type Props = {
    labels: string[];
    values: number[];
};

export const Piechart = ({ labels, values }: Props) => {

    const data = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 0,
            },
        ],
    };
    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            title: {
                display: true,
                text: "Recent Expenses (Last 7 days)",
                align: "center",          // 👉 right align
                color: "#686767",      // 🖤 black color
                font: {
                    size: 20,
                    weight: "bold",
                },
                padding:12
            },
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div className="card shadow-lg border-2 h-100">
            <div className="card-body pie-card-body">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
}

