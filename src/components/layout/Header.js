import React, {Fragment} from 'react';


const Header = () =>(
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Gasto</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link" href="/tipogastos">Tipo Gastos</a>
        <a className="nav-link" href="/tipoentradas">Tipo Entradas</a>
        <a className="nav-link" href="/salidas">Salidas</a>
        <a className="nav-link" href="/entradas">Entradas</a>

      </div>
    </div>
  </div>
</nav>
)
export default Header;