let studentList = [];

const getEle = (id) => {
  return document.getElementById(id);
};

//Lay danh sach sinh vien tu backend

const fetchStudents = () => {
  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
    method: "GET",
  })
    .then((res) => {
      studentList = res.data;
      renderStudent();
    })
    .catch((err) => {
      console.log(err);
    });
};

//Hien thi danh sach sinh vien
const renderStudent = () => {
  //giao diện của 1 sinh viên
  //duyệt studentList
  let htmlContent = "";
  for (let student of studentList) {
    htmlContent += `
    <tr>
      <td>${student.MaSV}</td>
      <td>${student.HoTen}</td>
      <td>${student.Email}</td>
      <td>${student.SoDT}</td>
      <td>${student.DiemToan}</td>
      <td>${student.DiemLy}</td>
      <td>${student.DiemHoa}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteStudent('${student.MaSV}')">Xoá</button>
        <button class="btn btn-info" onclick="getStudent('${student.MaSV}')">Cập Nhật</button>
      </td>
    </tr>`;
  }
  console.log(htmlContent);
  getEle("tableDanhSach").innerHTML = htmlContent;
};

//Them Sinh Vien
const addStudent = () => {
  const studentId = getEle("id").value;
  const name = getEle("name").value;
  const email = getEle("email").value;
  const phone = getEle("phone").value;
  const idCard = getEle("idCard").value;
  const math = getEle("math").value;
  const physics = getEle("physics").value;
  const chemistry = getEle("chemistry").value;

  const newStudent = new Student(
    studentId,
    name,
    email,
    phone,
    idCard,
    math,
    physics,
    chemistry
  );
  console.log(newStudent);
  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
    method: "POST",
    data: newStudent,
  })
    .then((res) => {
      //gọi lại hàm fetch student mới.
      fetchStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteStudent = (id) => {
  axios({
    url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${id}`,
    method: 'DELETE',
  }).then((res) => {
    fetchStudents();
  }).catch((err) => {
    console.log(err);
  })
}

const getStudent = (id) => {
  axios({
    url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${id}`,
    method: 'GET',
  }).then((res) => {
    getEle("btnThem").click();
    getEle("id").value = res.data.MaSV;
    getEle("name").value = res.data.HoTen;
    getEle("email").value = res.data.Email;
    getEle("phone").value = res.data.SoDT;
    getEle("idCard").value = res.data.CMND;
    getEle("math").value = res.data.DiemToan;
    getEle("physics").value = res.data.DiemLy;
    getEle("chemistry").value = res.data.DiemHoa;
    getEle("id").setAttribute('disabled', true);
  }).catch((err) => {
    console.log(err);
  });
}

const updateStudent = () => {
  const studentId = getEle("id").value;
  const name = getEle("name").value;
  const email = getEle("email").value;
  const phone = getEle("phone").value;
  const idCard = getEle("idCard").value;
  const math = getEle("math").value;
  const physics = getEle("physics").value;
  const chemistry = getEle("chemistry").value;

  const updatedStudent = new Student(
    studentId,
    name,
    email,
    phone,
    idCard,
    math,
    physics,
    chemistry
  );
  console.log(updateStudent);
  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien",
    method: "PUT",
    data: updatedStudent,
  })
    .then((res) => {
      //clear form
        getEle('btnReset').click();
      //gọi lại hàm fetch student mới.
      fetchStudents();
      getEle('btnClose').click();
      // mở khoá ô input id
      getEle("id").removeAttribute('disabled');
    })
    .catch((err) => {
      console.log(err);
    });
}

fetchStudents();


