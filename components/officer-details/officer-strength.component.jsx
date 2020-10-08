const OfficerStrength = ({ strengthValue }) => (
  <span style={{ paddingLeft: '10px', lineHeight: '20px' }}>
    <span style={{ display: 'block' }}>
      <small>STRENGTH</small>
    </span>
    <span style={{ display: 'block', fontWeight: '700', fontSize: '30px' }}>{strengthValue.toFixed(0)}</span>
  </span>
);

export default OfficerStrength;
