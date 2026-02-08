import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    // labels: string[];
    values: number[];
};

export const DonoughtChart = ({  values }: Props) => {

    const data = {
        labels: ['UPI', 'Net Banking', 'Case'],
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
                borderWidth: 1,
            },
        ],
    };
    const options: ChartOptions<'doughnut'>  = {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '53%',
    
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        };
    return (
        <div className="donut-wrapper ">
            <Doughnut data={data} options={options}  />;

        </div>)
}


