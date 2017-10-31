$(function() {

  $("#add").click(function() {
    var stu_num   = $("#stu_num").val();
    var name      = $("#name").val();
    var address   = $("#address").val();
    var phone_num = $("#phone_num").val();
    var gpa       = $("#gpa").val();
    var acad_plan = $("#acad_plan").val();
    var level     = $("#level").val();
    var status    = $("#status").val();

    var student = {
      stu_num: stu_num,
      name: name,
      address: address,
      phone_num: phone_num,
      gpa: gpa,
      acad_plan: acad_plan,
      level: level,
      status: status
    }

    var students = JSON.parse(localStorage.getItem("students"));

    if(!students){
        students = [];
    }

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    var row = $("<tr>");

    var stu_numData = $("<td>");
    stu_numData.html(stu_num);
    row.append(stu_numData);

    var nameData = $("<td>");
    nameData.html(name);
    row.append(nameData);

    var addressData = $("<td>");
    addressData.html(address);
    row.append(addressData);

    var phone_numData = $("<td>");
    phone_numData.html(phone_num);
    row.append(phone_numData);

    var gpaData = $("<td>");
    gpaData.html(gpa);
    row.append(gpaData);

    var acad_planData = $("<td>");
    acad_planData.html(acad_plan);
    row.append(acad_planData);

    var levelData = $("<td>");
    levelData.html(level);
    row.append(levelData);

    var statusData = $("<td>");
    statusData.html(status);
    row.append(statusData);

    var delData = $("<td>");
    delData.html("<button class='btn-link'><i class='material-icons'>delete_forever</i></button>");
    // delData.html("<i class='material-icons'>delete_forever</i>");
    row.append(delData);

    $("#students").prepend(row);

    $("#stu_num").val("");
    $("#name").val("");
    $("#address").val("");
    $("#phone_num").val("");
    $("#gpa").val("");
    $("#acad_plan").val("");
    $("#level").val("");
    $("#status").val("");

  });

  $("button").click(function() {
    console.log("trash can clicked");
  });

  $("#clear").click(function() {
    localStorage.clear();

    $("#stu_num").val("");
    $("#name").val("");
    $("#address").val("");
    $("#phone_num").val("");
    $("#gpa").val("");
    $("#acad_plan").val("");
    $("#level").val("");
    $("#status").val("");
  });

  // When the page loads, we will add the json array "students" to our UI
  var students = JSON.parse(localStorage.getItem("students"));
  if (students) {

    for (i in students) {
      var row = $("<tr>");

      var stu_numData = $("<td>");
      stu_numData.html(students[i].stu_num);
      row.append(stu_numData);

      var nameData = $("<td>");
      nameData.html(students[i].name);
      row.append(nameData);

      var addressData = $("<td>");
      addressData.html(students[i].address);
      row.append(addressData);

      var phone_numData = $("<td>");
      phone_numData.html(students[i].phone_num);
      row.append(phone_numData);

      var gpaData = $("<td>");
      gpaData.html(students[i].gpa);
      row.append(gpaData);

      var acad_planData = $("<td>");
      acad_planData.html(students[i].acad_plan);
      row.append(acad_planData);

      var levelData = $("<td>");
      levelData.html(students[i].level);
      row.append(levelData);

      var statusData = $("<td>");
      statusData.html(students[i].status);
      row.append(statusData);

      var delData = $("<td>");
      delData.html("<button class='btn-link' id ='row" + i + "'><i class='material-icons'>delete_forever</i></button>");
      // delData.html("<i class='material-icons'>delete_forever</i>");
      row.append(delData);

      $("#students").prepend(row);
    }
  }
});
