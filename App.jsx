import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [surat, setSurat] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mengambil data dari Public API sesuai slide
    axios.get('https://equran.id/api/v2/surat')
      .then((response) => {
        setSurat(response.data.data) // Struktur data equran.id v2
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-dark bg-primary mb-4 rounded">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">My Quran - Digital API</span>
        </div>
      </nav>

      <div className="row">
        {loading ? (
          <div className="text-center">Memuat Data...</div>
        ) : (
          surat.map((item) => (
            <div className="col-md-4 mb-3" key={item.nomor}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{item.nomor}. {item.namaLatin}</h5>
                    <p className="card-text text-muted">{item.arti} ({item.jumlahAyat} Ayat)</p>
                  </div>
                  <div className="text-end">
                    <h3 className="arabic-font">{item.nama}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
