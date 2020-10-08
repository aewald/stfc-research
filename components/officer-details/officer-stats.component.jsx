const OfficerStats = ({ type, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>{type}</span>
    <span>{value}</span>
  </div>
);

export default OfficerStats;
