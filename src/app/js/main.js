$(document).ready(() => {
  /*Открытие Float-container'а*/
  $('.about-btn').click(() => {
    $('.about-container').attr('show', 'yes')
    $('.about-container .ss-content').animate({ scrollTop: 0 });
  })
  /*END*/

  /*Закрытие Float-container'а*/
  $('.float-container .float-header').click(() => {
    $('.float-container').attr('show', 'no')
  })
  /*END*/

  $('.burger').click(function () {
    let val = $(this).attr('active') === 'yes' ? 'no' : 'yes'
    $(this).attr('active', val)
  })


});