export default function handler(req, res) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  res.status(200).json({ isMaintenanceMode });
}
