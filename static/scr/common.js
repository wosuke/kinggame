let player_num = 3,
    player_arr = [],
    number_arr = [];

$(function(){
  // step1
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  $('#add_plyr').click(function(){
    if( player_num == 10 ) return false;
    player_num++;
    $('#step1>p').html(player_num);
  });
  $('#rst_plyr').click(function(){
    player_num = 3;
    $('#step1>p').html(player_num);
  });
  $('#fix_plyr').click(function(){
    if( $('#step1').hasClass('hide') ) return false;
    // table layout -------------
    let sec_arr = ['sec_l', 'sec_r', 'sec_b', 'sec_t'],
        sec_num = 0,
        charai_arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
    $('#step2').children('section').empty();
    player_arr = [];
    for (let index = 0; index < player_num; index++) {
      let rdm = Math.floor( Math.random() * charai_arr.length );
      $('#'+sec_arr[sec_num]).append('<div class="player" id="char'+charai_arr[rdm]+'"><p></p></div>');
      player_arr.push('char'+charai_arr[rdm]);
      sec_num = ( sec_num == 3 ) ? 0 : sec_num + 1;
      charai_arr.splice(rdm, 1);
      if( index+1 != player_num ) number_arr.push(index+1);
    }
    // table layout -------------
    $('#step1').addClass('hide');
  });

  // step2
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  let slot_wait = false,
      king_numb = 0;
  $('#chc_king').click(function(){
    if( slot_wait ) return false;
    slot_wait = true;

    king_numb = Math.floor( Math.random() * player_arr.length );
    $('#'+player_arr[king_numb]).addClass('charkg');

    setTimeout(() => {
      $(this).css('display','none');
      $('#opn_numb').css('display','block');
    }, 2000);
  });

  let open_wait = false;
  $('#opn_numb').click(function(){
    if( open_wait ) return false;
    open_wait = true;

    let l = number_arr.length;
    while (l) {
      let r = Math.floor( Math.random() * l ),
          a = number_arr[--l];
      number_arr[l] = number_arr[r];
      number_arr[r] = a;
    }
    let cnt = 0;
    for (let i = 0; i < player_num; i++) {
      if( i != king_numb ) {
        $('#'+player_arr[i]).addClass('view').children('p').html(number_arr[cnt]);
        cnt++;
      }
    }
    setTimeout(() => {
      $(this).css('display','none');
      $('#rst_game').css('display','block');
    }, 1000);
  });

  $('#rst_game').click(function(){
    slot_wait = false;
    open_wait = false;
    $('.player').removeClass('charkg view');
    $(this).css('display','none');
    $('#chc_king').css('display','block');
  });

});