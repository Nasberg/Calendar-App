$(document).ready(() => {
  const calendarElDay = document.getElementById('calendarDay');
  const calendarDay = new FullCalendar.Calendar(calendarElDay, {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
    themeSystem: 'bootstrap',
    locale: 'sv',
    defaultView: 'timeGridDay',
    aspectRatio: 1.7,
    selectable: true,
    selectMinDistance: 1,
    editable: true,
    header: {
      left: 'today',
      center: 'timeGridDay list',
      right: 'prev,next'
    },
    titleFormat: {
      year: 'numeric',
      month: 'long'
    },
    columnHeaderFormat: {
      weekday: 'long',
      month: 'numeric',
      day: 'numeric'
    },
    nowIndicator: true,
    events: '/events',
    dateClick: (info) => {
      $('#modal-view-add-event').find('#add-title, #add-ends-at-date, #add-ends-at-time, #add-description').val('');
      $('#modal-view-add-event').find('#add-starts-at-date, #add-ends-at-date').val(moment(info.date).locale('sv').format('YYYY-MM-DD'));
      $('#modal-view-add-event').find('#add-starts-at-time').val(moment(info.date).locale('sv').format('HH:mm'));
      $('#modal-view-add-event').find('#add-color, #add-icon').prop('selectedIndex', 0);
      $('#modal-view-add-event').modal();
    },
    select: (info) => {
      $('#modal-view-add-event').find('#add-title, #add-description').val('');
      $('#modal-view-add-event').find('#add-starts-at-date').val(moment(info.start).locale('sv').format('YYYY-MM-DD'));
      $('#modal-view-add-event').find('#add-ends-at-date').val(moment(info.end).locale('sv').format('YYYY-MM-DD'));
      $('#modal-view-add-event').find('#add-starts-at-time').val(moment(info.start).locale('sv').format('HH:mm'));
      $('#modal-view-add-event').find('#add-ends-at-time').val(moment(info.end).locale('sv').format('HH:mm'));
      $('#modal-view-add-event').find('#add-color, #add-icon').prop('selectedIndex', 0);
      $('#modal-view-add-event').modal();
    },
    eventClick: (info) => {
      $('#modal-view-event').find('.modal-footer').data('id', info.event.extendedProps._id);
      $('#modal-view-event').find('#finishedEvent').prop('checked', info.event.extendedProps.eventFinished);
      $('#modal-view-event').find('#title').val(info.event.title);
      $('#modal-view-event').find('#starts-at-date').val(moment(info.event.start).locale('sv').format('YYYY-MM-DD'));
      $('#modal-view-event').find('#ends-at-date').val(moment(info.event.end).locale('sv').format('YYYY-MM-DD'));
      $('#modal-view-event').find('#allDayEvent').prop('checked', info.event.allDay);
      $('#modal-view-event').find('#starts-at-time').val(moment(info.event.start).locale('sv').format('HH:mm'));
      $('#modal-view-event').find('#ends-at-time').val(moment(info.event.end).locale('sv').format('HH:mm'));
      if (info.event.allDay) {
        $('#starts-at-time').prop('disabled', true);
        $('#ends-at-time').prop('disabled', true);
      }
      $('#modal-view-event').find('#description').val(info.event.extendedProps.description);
      $('#modal-view-event').find('#icon').val(info.event.extendedProps.icon);
      $('#modal-view-event').modal();
    },
    eventDrop: (info) => {
      const events = {
        start: moment(info.event.start).locale('sv').format('YYYY-MM-DD HH:mm'),
        end: moment(info.event.end).locale('sv').format('YYYY-MM-DD HH:mm')
      };

      const id = info.event.extendedProps._id;

      $.ajax({
        type: 'PUT',
        url: `/update-event/${id}`,
        data: events,
        success: (data) => {
          location.reload();
        }
      });
    },
    eventResize: (info) => {
      const events = {
        start: moment(info.event.start).locale('sv').format('YYYY-MM-DD HH:mm'),
        end: moment(info.event.end).locale('sv').format('YYYY-MM-DD HH:mm')
      };

      const id = info.event.extendedProps._id;

      $.ajax({
        type: 'PUT',
        url: `/update-event/${id}`,
        data: events,
        success: (data) => {
          location.reload();
        }
      });
    }
  });

  // Full Calendar Daygrid Month
  const calendarElMonth = document.getElementById('calendarMonth');
  const calendarMonth = new FullCalendar.Calendar(calendarElMonth, {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
    themeSystem: 'bootstrap',
    locale: 'sv',
    defaultView: 'dayGridMonth',
    selectable: true,
    selectMinDistance: 1,
    editable: true,
    eventResizableFromStart: true,
    header: {
      left: 'title',
      center: '',
      right: 'today prev,next'
    },
    titleFormat: {
      year: 'numeric',
      month: 'long'
    },
    weekNumbers: true,
    events: '/events',
    dateClick: (info) => {
      $('#modal-view-add-event').find('#add-title, #add-ends-at-date, #add-ends-at-time, #add-description').val('');
      $('#modal-view-add-event').find('#add-starts-at-date, #add-ends-at-date').val(moment(info.date).locale('sv').format('YYYY-MM-DD'));
      $('#modal-view-add-event').find('#add-starts-at-time').val(moment(info.date).locale('sv').format('HH:mm'));
      $('#modal-view-add-event').find('#add-color, #add-icon').prop('selectedIndex', 0);
      $('#modal-view-add-event').modal();
    },
    select: (info) => {
      $('#modal-view-add-event').find('#add-title, #add-description').val('');
      $('#modal-view-add-event').find('#add-starts-at-date').val(moment(info.start).locale('sv').format('YYYY-MM-DD'));
      $('#modal-view-add-event').find('#add-ends-at-date').val(moment(info.end).locale('sv').format('YYYY-MM-DD'));
      $('#modal-view-add-event').find('#add-starts-at-time').val(moment(info.start).locale('sv').format('HH:mm'));
      $('#modal-view-add-event').find('#add-ends-at-time').val(moment(info.end).locale('sv').format('HH:mm'));
      $('#modal-view-add-event').find('#add-color, #add-icon').prop('selectedIndex', 0);
      $('#modal-view-add-event').modal();
    },
    eventClick: (info) => {
      $('#modal-view-event').find('.modal-footer').data('id', info.event.extendedProps._id);
      $('#modal-view-event').find('#finishedEvent').prop('checked', info.event.extendedProps.eventFinished);
      $('#modal-view-event').find('#title').val(info.event.title);
      $('#modal-view-event').find('#starts-at-date').val(moment(info.event.start).locale('sv').format('YYYY-MM-DD'));
      $('#modal-view-event').find('#ends-at-date').val(moment(info.event.end).locale('sv').format('YYYY-MM-DD'));
      $('#modal-view-event').find('#allDayEvent').prop('checked', info.event.allDay);
      $('#modal-view-event').find('#starts-at-time').val(moment(info.event.start).locale('sv').format('HH:mm'));
      $('#modal-view-event').find('#ends-at-time').val(moment(info.event.end).locale('sv').format('HH:mm'));
      if (info.event.allDay) {
        $('#starts-at-time').prop('disabled', true);
        $('#ends-at-time').prop('disabled', true);
      }
      $('#modal-view-event').find('#description').val(info.event.extendedProps.description);
      $('#modal-view-event').find('#icon').val(info.event.extendedProps.icon);
      $('#modal-view-event').modal();
    },
    eventDrop: (info) => {
      const events = {
        start: moment(info.event.start).locale('sv').format('YYYY-MM-DD HH:mm'),
        end: moment(info.event.end).locale('sv').format('YYYY-MM-DD HH:mm')
      };

      const id = info.event.extendedProps._id;

      $.ajax({
        type: 'PUT',
        url: `/update-event/${id}`,
        data: events,
        success: (data) => {
          location.reload();
        }
      });
    },
    eventResize: (info) => {
      const events = {
        start: moment(info.event.start).locale('sv').format('YYYY-MM-DD'),
        end: moment(info.event.end).locale('sv').format('YYYY-MM-DD')
      };

      const id = info.event.extendedProps._id;

      $.ajax({
        type: 'PUT',
        url: `/update-event/${id}`,
        data: events,
        success: (data) => {
          location.reload();
        }
      });
    }
  });

  // Render Calendars
  calendarDay.render();
  calendarMonth.render();

  // Start date datetimepicker for modalViewEvent
  $('#starts-at-date').datetimepicker({
    locale: 'sv',
    format: 'YYYY-MM-DD',
    calendarWeeks: true
  });

  // End date datetimepicker for modalViewEvent
  $('#ends-at-date').datetimepicker({
    locale: 'sv',
    format: 'YYYY-MM-DD',
    calendarWeeks: true,
    useCurrent: false
  });

  // Changing start date will set end date minDate in modalViewEvent
  $("#starts-at-date").on("change.datetimepicker", (e) => {
    $('#ends-at-date').datetimepicker('minDate', e.date);
  });
  // Changing end date will set start date maxDate in modalViewEvent
  $("#ends-at-date").on("change.datetimepicker", (e) => {
    $('#starts-at-date').datetimepicker('maxDate', e.date);
  });

  // Start time datetimepicker in modalViewEvent
  $('#starts-at-time').datetimepicker({
    locale: 'sv',
    format: 'HH:mm'
  });

  // End time datetimepicker in modalViewEvent
  $('#ends-at-time').datetimepicker({
    locale: 'sv',
    format: 'HH:mm',
    useCurrent: false
  });

  // Changing start time will set end time minDate in modalViewEvent
  $("#starts-at-time").on("change.datetimepicker", (e) => {
    $('#ends-at-time').datetimepicker('minDate', e.date);
  });
  // Changing end date will set start date maxDate in modalViewEvent
  $("#ends-at-time").on("change.datetimepicker", (e) => {
    $('#starts-at-time').datetimepicker('maxDate', e.date);
  });

  // Start date datetimepicker for modalViewAddEvent
  $('#add-starts-at-date').datetimepicker({
    locale: 'sv',
    format: 'YYYY-MM-DD',
    calendarWeeks: true
  });

  // End date datetimepicker for modalViewAddEvent
  $('#add-ends-at-date').datetimepicker({
    locale: 'sv',
    format: 'YYYY-MM-DD',
    calendarWeeks: true,
    useCurrent: false
  });

  // Changing start date will set end date minDate in modalViewAddEvent
  $("#add-starts-at-date").on("change.datetimepicker", (e) => {
    $('#add-ends-at-date').datetimepicker('minDate', e.date);
  });
  // Changing end date will set start date maxDate in modalViewAddEvent
  $("#add-ends-at-date").on("change.datetimepicker", (e) => {
    $('#add-starts-at-date').datetimepicker('maxDate', e.date);
  });

  // Start time datetimepicker in modalViewAddEvent
  $('#add-starts-at-time').datetimepicker({
    locale: 'sv',
    format: 'HH:mm'
  });

  // End time datetimepicker in modalViewAddEvent
  $('#add-ends-at-time').datetimepicker({
    locale: 'sv',
    format: 'HH:mm',
    useCurrent: false
  });

  // Changing start time will set end time minDate in modalViewAddEvent
  $("#add-starts-at-time").on("change.datetimepicker", (e) => {
    $('#add-ends-at-time').datetimepicker('minDate', e.date);
  });
  // Changing end date will set start date maxDate in modalViewAddEvent
  $("#add-ends-at-time").on("change.datetimepicker", (e) => {
    $('#add-starts-at-time').datetimepicker('maxDate', e.date);
  });

  // var for chart data
  let chartData = [];

  // Initiate Chart
  const ctx = document.getElementById('testChart');
  let testChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ['Work', 'Code'],
      datasets: [{
        label: '% of time spent today',
        data: chartData,
        backgroundColor: [
          '#00CECE',
          '#00E600'
        ],
        borderColor: [
          '#006D6D',
          '#009200'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  // checking add-modal allDay checkbox will disable start and end time
  $('#add-allDayEvent').change(() => {
    if ($('#add-allDayEvent').is(':checked')) {
      $('#add-starts-at-time').prop('disabled', true);
      $('#add-ends-at-time').prop('disabled', true);
    }
    else {
      $('#add-starts-at-time').prop('disabled', false);
      $('#add-ends-at-time').prop('disabled', false);
    }
  });

  // checking modal allDay checkbox will disable start and end time
  $('#allDayEvent').change(() => {
    if ($('#allDayEvent').is(':checked')) {
      $('#starts-at-time').prop('disabled', true);
      $('#ends-at-time').prop('disabled', true);
    }
    else {
      $('#starts-at-time').prop('disabled', false);
      $('#ends-at-time').prop('disabled', false);
    }
  });

  // adding/saving a new event
  $('#save-event').on('click', () => {
    $('#modal-view-add-event').modal('hide');

    let allDay = false;
    if ($('#add-allDayEvent').is(':checked')) {
      allDay = true;
    }

    function checkAllDay(date, time) {
      if (allDay) {
        return `${date}`;
      }
      else {
        return `${date} ${time}`;
      }
    }

    let bgColor, boColor;

    switch ($('#add-icon').children("option:selected").val()) {
      case 'work':
        bgColor = '#00CECE';
        boColor = '#006D6D';
        break;
      case 'code':
      bgColor = '#00E600';
      boColor = '#009200';
        break;
    }

    const events = {
      title: $('#add-title').val(),
      start: checkAllDay($('#add-starts-at-date').val(), $('#add-starts-at-time').val()),
      end: checkAllDay($('#add-ends-at-date').val(), $('#add-ends-at-time').val()),
      allDay: allDay,
      description: $('#add-description').val(),
      icon: $('#add-icon').children("option:selected").val(),
      eventFinished: false,
      backgroundColor: bgColor,
      borderColor: boColor
    };

    $.ajax({
      type: 'POST',
      url: '/new-event',
      data: events,
      success: (data) => {
        location.reload();
      }
    });
  });

  // updating an event
  $('#update-event').on('click', () => {
    $('#modal-view-event').modal('hide');

    let allDay = false;
    if ($('#allDayEvent').is(':checked')) {
      allDay = true;
    }

    function checkAllDay(date, time) {
      if (allDay) {
        return `${date}`;
      }
      else {
        return `${date} ${time}`;
      }
    }

    let finished = false;
    if ($('#finishedEvent').is(':checked')) {
      finished = true;
    }

    let bgColor, boColor;

    switch ($('#icon').children("option:selected").val()) {
      case 'work':
        bgColor = '#00CECE';
        boColor = '#006D6D';
        break;
      case 'code':
      bgColor = '#00E600';
      boColor = '#009200';
        break;
    }

    const events = {
      title: $('#title').val(),
      start: checkAllDay($('#starts-at-date').val(), $('#starts-at-time').val()),
      end: checkAllDay($('#ends-at-date').val(), $('#ends-at-time').val()),
      allDay: allDay,
      description: $('#description').val(),
      icon: $('#icon').children("option:selected").val(),
      eventFinished: finished,
      backgroundColor: bgColor,
      borderColor: boColor
    };

    const eventId = $('#modal-view-event').find('.modal-footer').data('id');

    $.ajax({
      type: 'PUT',
      url: `/update-event/${eventId}`,
      data: events,
      success: (data) => {
        location.reload();
      }
    });
  });

  // deleting an event
  $('#delete-event').on('click', () => {
    $('#modal-view-event').modal('hide');

    const id = $('#modal-view-event').find('.modal-footer').data('id');

    $.ajax({
      type: 'DELETE',
      url: `/delete-event/${id}`,
      success: (data) => {
        location.reload();
      }
    })
  });

  // get stats from events collection
  $.get(`/todays-events/${moment(new Date()).format('YYYY-MM-DD')}`, (data) => {
    // get tasks for progressbar
    let percentage;
    if (data.finishedEvents[0] == 0) {
      percentage = 0;
    }
    else {
      percentage = Math.floor(data.finishedEvents[0] / data.finishedEvents[1] * 100);
    }

    $('.progress-bar').css('width', `${percentage}%`);
    $('#progressPercentage').text(`${percentage}%`);
    $('#progressRatio').text(`${data.finishedEvents[0]}/${data.finishedEvents[1]}`);

    // get tasks for daily stats chart
    const work = data.typeOfEvents.filter(item => item == 'work').length;
    const code = data.typeOfEvents.filter(item => item == 'code').length;
    chartData.push(work, code);
  });
});
