$(document).ready(() => {
  /* Открытие Float-container'а */
  $('.show-float-container').click(() => {
    $('.float-container').attr('show', 'yes')
    $('.float-container.ss-content').animate({scrollTop: 0})
  })
  /* END */

  /* Закрытие Float-container'а */
  $('.float-container .float-header').click(() => {
    $('.float-container').attr('show', 'no')
  })
  /* END */

  /* Нажатие бургера */
  $('.burger').click(function() {
    const val = $(this).attr('active') === 'yes' ? 'no' : 'yes'
    $(this).attr('active', val)
  })
  /* END */
})