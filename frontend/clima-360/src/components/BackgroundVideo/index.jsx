export function BackgroundVideo() {
  return (
    <>
      {/* TODO: criar condicional para exibir o vídeo de acordo com o tempo. Ex.: sol, chuva, etc */}
      <video autoPlay loop muted id="background-video">
        <source src="sun.mp4" type="video/mp4" />
        {/* TODO: caso o navegador não suporte vídeo, substituir por imagem */}
      </video>
    </>
  );
}
