//sort
var order_values = {}
var sort_process = false;

function Sort(page, sort, default_order, filter, filter_value) {
  if (sort_process) return;
  sort_process = true;

  if (!order_values[sort]) {
    order_values[sort] = default_order;
  }

  var order = order_values[sort];
  order_values[sort] = 1 - order_values[sort];

  var httpRequest;
  if (typeof window.ActiveXObject != 'undefined') {
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");}
  else {
    httpRequest = new XMLHttpRequest();
  }

  httpRequest.open("GET", "/samp_ajax_"+page+".php?sort="+sort+"&order="+order+"&filter="+filter+"&filter_value="+filter_value, true);
  httpRequest.onreadystatechange = function() {
    ProcessSort(page, httpRequest) 
  };
  httpRequest.send(null);
}

function ProcessSort(page, httpRequest) {
  if (httpRequest.readyState == 4) {
    if (httpRequest.status == 200) {
      sort_process = false;

      document.getElementById(page).innerHTML = httpRequest.responseText;
    }
  }
}
//sort

//filter
var filter_process = false;

function Filter(page, filter, filter_value, sort, order) {
  if (filter_process) return;
  filter_process = true;

  Pop("filter_"+filter);

  var httpRequest;
  if (typeof window.ActiveXObject != 'undefined') {
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");}
  else {
    httpRequest = new XMLHttpRequest();
  }

  httpRequest.open("GET", "/samp_ajax_"+page+".php?filter="+filter+"&filter_value="+filter_value+"&sort="+sort+"&order="+order, true);
  httpRequest.onreadystatechange = function() {
    ProcessFilter(page, httpRequest) 
  };
  httpRequest.send(null);
}

function ProcessFilter(page, httpRequest) {
  if (httpRequest.readyState == 4) {
    if (httpRequest.status == 200) {
      filter_process = false;

      document.getElementById(page).innerHTML = httpRequest.responseText;
    }
  }
}
//filter

//pop
var pop = {}

function Pop(element) {
  if (pop[element] == true) {
    document.getElementById(element).style.visibility = "hidden";
  }
  else {
    document.getElementById(element).style.visibility = "visible";
  }

  pop[element] = !pop[element];
}
//pop