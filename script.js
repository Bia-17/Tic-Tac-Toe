function fechar() {
  window.close();
}

let isMaximized = false;
let originalSize = { width: 0, height: 0, left: 0, top: 0 };

function maximizar() {
  if (!isMaximized) {
    originalSize.width = window.outerWidth;
    originalSize.height = window.outerHeight;
    originalSize.left = window.screenX;
    originalSize.top = window.screenY;

    window.moveTo(0, 0);
    window.resizeTo(screen.availWidth, screen.availHeight);
    isMaximized = true;
  } else {
    window.moveTo(originalSize.left, originalSize.top);
    window.resizeTo(originalSize.width, originalSize.height);
    isMaximized = false;
  }
}

function startGame() {
      const largura = 295;
      const altura = 403;
      const left = (screen.width - largura) / 2;
      const top = (screen.height - altura) / 2;

        window.location.href = 'game-page.html',
        'ticTacToeWindow',
        `width=${largura},height=${altura},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=no,resizable=no`

      janela.onload = function () {
        const ajustaLargura = largura - (janela.outerWidth - janela.innerWidth);
        const ajustaAltura = altura - (janela.outerHeight - janela.innerHeight);
        janela.resizeTo(ajustaLargura, ajustaAltura);
      };
    }