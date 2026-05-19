import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

function Charts({clicksData}) {
  
    
    return (
        <ResponsiveContainer width="100%" aspect={2}> 
            <LineChart
            responsive
            data={clicksData ?? []}
            margin={{
                top: 20,
                right: 20,
                bottom: 5,
                left: 0,
            }}
            >
            <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="clicks" stroke="purple" strokeWidth={2} name="clicks"/>
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} width="auto" label={{ value: "clicks", position: 'insideLeft', angle: -90 }} />
            <Legend align="right" />
            <Tooltip />
        
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Charts