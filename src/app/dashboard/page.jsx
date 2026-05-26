import LogoutButton from "../components/moleculs/LogoutButton";

export default function DashboardAdmin() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Selamat Datang, Admin Delima!</h1>

      {/* Tombol logout dipanggil di sini */}
      <LogoutButton />
    </div>
  );
}
