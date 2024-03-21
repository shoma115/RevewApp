import ReactEcharts from 'echarts-for-react';
import {Rating} from '@mui/material';

export const RaderChart = (props) => {
  
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
            value: [
              props.props.reviews_avg_opinion, 
              props.props.reviews_avg_expertise, 
              props.props.reviews_avg_ease,
              props.props.reviews_avg_communication,
              props.props.reviews_avg_assignment,
              props.props.reviews_avg_growth
            ],
            label: {
              show: true,
            }
          },
        ],
      },
    ],
  };

  return (
    <>
      <h4 className='total_evaluation'>総合:
        <Rating 
            precision={0.1} 
            value={props.props.total_evaluation} 
            readOnly>
        </Rating>
      </h4>
      <ReactEcharts option={option} opts={{ renderer: 'svg' }} />
    </>
  );
}
