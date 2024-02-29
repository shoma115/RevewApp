import ReactEcharts from 'echarts-for-react';

export const RaderChart = () => {
  const option = {
    radar: {
      indicator: [
        { name: '意見しやすい環境', max: 5 },
        { name: '専門性', max: 5 },
        { name: '楽単', max: 5 },
        { name: '受講生同士の交流', max: 5 },
        { name: '課題量', max: 5 },
        { name: '成長実感', max: 5 },
      ],
    },
    series: [
      {
        type: 'radar',
        areaStyle: { color: '#606DC2', opacity: 0.1 },
        data: [
          {
            value: [4, 2, 5, 3, 1, 4],
            label: {
              show: true,
            }
          },
        ],
      },
    ],
  };

  return <ReactEcharts option={option} opts={{ renderer: 'svg' }} />;
}
