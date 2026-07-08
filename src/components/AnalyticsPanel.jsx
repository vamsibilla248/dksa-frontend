function AnalyticsPanel({ analytics }) {
  return (
    <div>
      <h2>Analytics</h2>

      <p>Revenue: ₹{analytics.totalRevenue}</p>

      <p>
        Bookings:
        {analytics.totalBookings}
      </p>

      <p>
        Customers:
        {analytics.totalCustomers}
      </p>
    </div>
  );
}

export default AnalyticsPanel;
