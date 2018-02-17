function add(div_id) {
    var container = document.getElementById(div_id);
    
    var frame = document.createElement("div");
    frame.className = 'form-row';

    var lab = document.createElement('div');
    lab.className = 'col';
    lab.textContent = "Symbol desc";

    var txt = document.createElement('label');
    txt.text = 'Symbol desc';

    var col_x = document.createElement("div");
    col_x.className = 'col';
    
    var col_y = document.createElement("div");
    col_y.className = 'col';
    
    var col_z = document.createElement("div");
    col_z.className = 'col';
    
    var input_x = document.createElement("input");
    input_x.className = "form-control";
    input_x.type = "button";

    var input_y = document.createElement("input");
    input_y.className = "form-control";
    input_y.type = "button";

    var input_z = document.createElement("input");
    input_z.className = "form-control";
    input_z.type = "button";    

    col_x.appendChild(input_x);
    col_y.appendChild(input_y);
    col_z.appendChild(input_z);

    frame.appendChild(lab);
    frame.appendChild(col_x);
    frame.appendChild(col_y);
    frame.appendChild(col_z);

    container.appendChild(frame);
}