import Popover from './Popover';

let button;
let popover;

beforeEach(() => {
  document.body.innerHTML = '<button type="button">Открыть подсказку</button>';
  button = document.querySelector('button');
  popover = new Popover(button, 'Заголовок', 'Текст подсказки');
  jest.spyOn(button, 'getBoundingClientRect').mockReturnValue({
    left: 200, top: 300, width: 120, height: 40,
  });
  jest.spyOn(popover.popover, 'getBoundingClientRect').mockReturnValue({
    width: 200, height: 80,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('при загрузке подсказка отсутствует на странице', () => {
  expect(document.querySelector('.popover')).toBeNull();
});

test('клик показывает подсказку с заголовком и текстом', () => {
  button.click();
  expect(document.querySelector('.popover')).not.toBeNull();
  expect(document.querySelector('.popover-title').textContent).toBe('Заголовок');
  expect(document.querySelector('.popover-content').textContent).toBe('Текст подсказки');
});

test('размещает подсказку над кнопкой с отступом для указателя', () => {
  button.click();
  expect(popover.popover.style.top).toBe('212px');
  expect(parseFloat(popover.popover.style.top) + 80).toBeLessThan(300);
});

test('совмещает горизонтальные центры подсказки и кнопки', () => {
  button.click();
  const popoverCenter = parseFloat(popover.popover.style.left) + 200 / 2;
  const buttonCenter = 200 + 120 / 2;
  expect(popoverCenter).toBe(buttonCenter);
});

test('повторный клик скрывает подсказку', () => {
  button.click();
  button.click();
  expect(document.querySelector('.popover')).toBeNull();
});

test('при новом открытии пересчитывает координаты и размеры', () => {
  button.click();
  button.click();
  button.getBoundingClientRect.mockReturnValue({
    left: 100, top: 500, width: 160, height: 40,
  });
  popover.popover.getBoundingClientRect.mockReturnValue({
    width: 180, height: 100,
  });

  button.click();
  expect(document.querySelectorAll('.popover')).toHaveLength(1);
  expect(popover.popover.style.left).toBe('90px');
  expect(popover.popover.style.top).toBe('392px');
});

test('учитывает горизонтальную и вертикальную прокрутку страницы', () => {
  jest.replaceProperty(window, 'scrollX', 45);
  jest.replaceProperty(window, 'scrollY', 120);
  button.click();

  expect(popover.popover.style.left).toBe('205px');
  expect(popover.popover.style.top).toBe('332px');
});
