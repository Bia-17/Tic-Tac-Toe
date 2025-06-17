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
    window.location.href = 'game-page.html',
    'TicTacToe',
    'width=295,height=403,toolbar=no,menubar=no,scrollbars=no,resizable=no'
}