const output = document.getElementById("output")
const input = document.getElementById("input")
const history = document.getElementById("history")
let arrOut = []
let j = 0

/* нажатия клавиш */
const btns = document.querySelectorAll('.btn')
window.addEventListener('keydown', keyboard)
function keyboard(e) {
   const attr = `[data-key="${e.key}"]`
   const key = document.querySelector('button' + attr)
}

/* открытие истории + появление кнопки очистки */
$(function () {
   $("#btn-open").click(function () {
      $("#block-result").toggleClass("block-result-full");
      $("#btn-clear").fadeIn()
   })
})

function inputNumber(i) {
   if (input.value != 'error') {
      if (j == 1) {
         input.value = ""
         j = 0
      } else if (j == 2) {
         output.value = ""
         input.value = ""
         arrOut = []
         j = 0
      }
      input.value.length < 18 ? input.value += i : '';
      
   }
}

function inputSymbol(s) {
   if (input.value != 'error') {
      if (j == 2) {
         arrOut = []
         arrOut.push(input.value.replace(/\s/g, ''))
         arrOut.push(' ' + s + ' ')
         output.value = arrOut.join('')
         j = 1
      } else if (j == 1 && arrOut[arrOut.length - 1] != s) {
         arrOut.pop()
         arrOut.push(' ' + s + ' ')
         output.value = arrOut.join('')
      } else {
         arrOut.push(input.value.replace(/\s/g, ''))
         arrOut.push(' ' + s + ' ')
         output.value = arrOut.join('')
         j = 1
      }
   }
}

/* результат */
function result() {
   if (input.value != "" && input.value != "error" && j != 2) {
      let num = eval(output.value + input.value.replace(/\s/g, ''))
      if (num == Infinity) {
         output.value = ""
         input.value = alert("Нельзя делить на ноль.");
         input.value = "";
         return
      }

      arrOut.push(input.value.replace(/\s/g, ''))
      arrOut.push(" =")
      output.value = arrOut.join('')
      input.value = num
      j = 2

      /* удаление пустой корзины и добавление истории */
      $(function () {
         $('.history__title').remove();
         $('.history__img').remove();
      });
      let history__example = document.createElement("p");
      history__example.className = "history__item2";
      history.prepend(history__example)
      history__example = document.createElement("p");
      history__example.className = "history__item1";
      history__example.innerHTML = output.value
      history.prepend(history__example)
   } else {
      output.value = ""
      input.value = "error"
      return
   }
   console.log(arrOut)

}

/* очистка */
function reset() {
   let result = confirm("Вы действительно хотите очистить поле?");
   if (result) {
      arrOut = []
      output.value = ""
      input.value = ""
      j = 0
   }
}

/* удаление последнего символа/цифры */
function backspace() {
   input.value == 'error' ? reset() : '';
   input.value = input.value.substring(0, input.value.length - 1)
}

/* очистка истории */
function clearHistory() {
   let h = document.getElementById("history")
   h.innerHTML = ""
   h = document.createElement("img")
   h.className = "history__img"
   h.setAttribute("src", "images/History.png")
   history.append(h)
   h = document.createElement("p")
   h.className = "history__title"
   h.innerHTML = "Истории еще нет"
   history.append(h)
}
