import "./SellerList.css";

export default function SellerList({ sellers = [], onApprove, onSuspend }) {
  return (
    <div className="seller-list">
      <h1>Sellers</h1>
      <table className="seller-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.status}</td>
              <td>
                <button
                  onClick={() => onApprove(s.id)}
                  className="btn-action btn-approve"
                >
                  Approve
                </button>
                <button
                  onClick={() => onSuspend(s.id)}
                  className="btn-action btn-suspend"
                >
                  Suspend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
