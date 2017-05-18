export default ({rowId, value}) => (
  <div
    key={rowId+value}
  >
    {
      value
    }
  </div>
);
