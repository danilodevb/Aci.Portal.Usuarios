export function BrandStage() {
  return (
    <div className="escenario" aria-hidden="true">
      <div className="brillo" />
      <div className="logo-contenedor">
        <div className="linea-luz" />
        <img className="logo" alt="" src="/assets/clave-sol.png" />
        <div className="marca" aria-label="Acinpro">
          {"Acinpro".split("").map((letter, index) => (
            <span className="letra" key={`${letter}-${index}`}>{letter}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
