import React from "react";

const StaffFormStaticA4 = () => {
  const data = {
    staffId: "089213339",
    khmerName: "ហេង ចាន់ ក្ញឹម",
    gender: "ប្រុស",
    unit: "មន្ទីរសុខាភិបាលខេត្ត",
    department: "1228",
    position: "176",
    phone: "089213339",
  };

  return (
    <div
      style={{
        width: "210mm",
        height: "297mm",
        padding: "20mm",
        fontFamily: "'Khmer OS Content', sans-serif",
        border: "1px solid black",
        position: "relative",
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <img
          src="https://via.placeholder.com/100" // Replace with the actual logo
          alt="Logo"
          style={{ width: "80px", marginBottom: "10px" }}
        />
        <h3 style={{ margin: "0", fontSize: "16px", color: "black" }}>
          មន្ទីរសុខាភិបាលខេត្តបាត់ដំបង
        </h3>
        <h4 style={{ margin: "0", fontSize: "14px", color: "black" }}>
          មន្ទីរពេទ្យសរុបអង្គ
        </h4>
      </div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2
          style={{
            margin: "10px 0",
            fontSize: "18px",
            fontWeight: "bold",
            color: "blue",
          }}
        >
          វិក្កយបត្រស្នើសុំប័ណ្ណសិទ្ធិនិងសន្តិសុខ
        </h2>
        <p style={{ margin: "0", fontSize: "14px", color: "black" }}>
          មន្ទីរពេទ្យសរុបអង្គ
        </p>
      </div>

      {/* Content Section */}
      <div style={{ lineHeight: "1.8", marginLeft: "50px" }}>
        <p>
          <strong>អត្តលេខ : </strong> {data.staffId}
        </p>
        <p>
          <strong>ឈ្មោះខ្មែរ : </strong> {data.khmerName}
        </p>
        <p>
          <strong>ភេទ : </strong> {data.gender}
        </p>
        <p>
          <strong>អង្គភាព : </strong> {data.unit}
        </p>
        <p>
          <strong>នាយកដ្ឋាន : </strong> {data.department}
        </p>
        <p>
          <strong>តួនាទី :</strong> {data.position}
        </p>
        <p>
          <strong>លេខទូរស័ព្ទ :</strong> {data.phone}
        </p>
      </div>

      {/* Footer Section */}
      <footer
        style={{
          position: "absolute",
          bottom: "20mm",
          textAlign: "center",
          fontSize: "12px",
          color: "black",
        }}
      >
        <p>សូមបំពេញអតិថិជនជាអក្សរពេញនិយម។ សូមសម្របអក្សរសំរាប់ការប្រើប្រាស់។</p>
        <p>អាសយដ្ឋាន: មន្ទីរពេទ្យសរុបអង្គ</p>
        <p>ថ្ងៃទី ០៣ ខែធ្នូ ឆ្នាំ២០២២</p>
      </footer>
    </div>
  );
};

export default StaffFormStaticA4;
