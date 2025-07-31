import "./App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Typography, Image, Col, Row } from "antd";

import dayjs from "dayjs";

import { BiCheckCircle, BiCircle } from "react-icons/bi";
import QrWithIcon from "./qrcode/qrcode";

function App() {
  const { id } = useParams(); // Get the ID from the URL
  const [donor, setDonor] = useState([]); // this is profile data
  const [dataDonor, setDataDonor] = useState([]); // this is data for all
  const sigle = false;
  const [loading, setLoading] = useState(true);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://his-api.votmean.app/api/donatorqrcodeintergrate/${id}`
      );

      if (!res.ok) {
        throw new Error(`Network error: ${res.status} ${res.statusText}`);
      }

      const api = await res.json();
      console.log("✅ API raw response:", api);

      // Add this check
      if (!api || typeof api !== "object") {
        console.warn("⚠️ API response is not an object. Stopping here.");
        return;
      }

      if (Array.isArray(api)) {
        console.warn("⚠️ API response is an array. Did you mean api[0]?");
        console.log("Array response content:", api);
      }

      // Optional: safe access
      setDonor(api.api_donor?.[0] || null);
      setDataDonor(api.api_donor_diagnosis || []);
    } catch (error) {
      console.error("❌ Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getList();
    }
  }, [id]); // Fetch data when `id` changes
  // Get the first organization image URL
  const isChecked = (type, donorTypeString) => {
    try {
      const types = JSON.parse(donorTypeString);
      return types.includes(type);
    } catch (error) {
      return false;
    }
  };
  const data = donor || {};
  const dataArray = Array.isArray(dataDonor) ? dataDonor : [];
  console.log("lange of data ", data.id);
  return (
    <div>
      {data.id != undefined ? (
        <>
          {" "}
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <span className="loading-spinner"></span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start", // Change to "center" if you want vertical centering
                backgroundColor: "#ccc", // page background
              }}
            >
              <div
                style={{
                  width: "210mm",
                  minHeight: "297mm",
                  padding: "10mm",
                  backgroundColor: "#fff",
                  boxShadow: "0 0 5px rgba(253, 253, 253, 0.3)",
                  fontFamily: '"Content", Arial, sans-serif',
                  color: "#000",
                  boxSizing: "border-box",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    textAlign: "center",
                    paddingBottom: "10px",
                  }}
                >
                  <div style={{}}>
                    <div className="header-text">
                      <span>ព្រះរាជាណាចក្រកម្ពុជា</span> <br />
                      <span>ជាតិ សាសនា ព្រះមហាក្សត្រ</span>
                      <br />
                      <img
                        src={
                          "https://his-api.votmean.app/photo/hmis_staff/" +
                          "tacteing_font.jpg"
                        }
                        alt="tacteing font"
                        style={{ width: "10%" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "start",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between", // this is the correct property
                        alignItems: "flex-start", // optional: align tops
                        width: "100%",
                      }}
                    >
                      <div>
                        <img
                          src={
                            "https://his-api.votmean.app/photo/hmis_staff/logo-app/file_image_logo-1751532094075-192528665-min.png"
                          }
                          alt="Organization Logo"
                          style={{
                            width: "80px",
                            height: "80px",
                            marginBottom: "2px",
                            marginLeft: 20,
                          }}
                        />
                        <span>
                          <span className="header-text">
                            <br /> រដ្ឋបាលខេត្តស្ទឹងត្រែង <br />
                          </span>
                        </span>
                        <span className="header-text">
                          មន្ទីរសុខាភិបាលនៃរដ្ឋបាល <br />
                        </span>

                        <span className="header-text">
                          មន្ទីរពេទ្យខេត្តស្ទឹងត្រែង
                        </span>
                        <br />
                      </div>
                      <div>
                        <QrWithIcon
                          value={
                            "https://blood-donation-pi-green.vercel.app/" +
                            data.ingerate_qrcode_id
                          }
                          iconUrl="https://his-api.votmean.app/photo/hmis_staff/logo-app/file_image_logo-1751532094075-192528665-min.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}

                <div className="print-content">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f0f0f0",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                      marginBottom: "10px",
                      width: "100%",
                      lineHeight: "1.5",
                    }}
                    className="print-content-profile"
                  >
                    <span
                      className="header-text"
                      style={{
                        margin: 0,
                      }}
                    >
                      ប័ណ្ណចុះឈ្មោះបរិច្ចាគឈាម
                    </span>
                  </div>
                  <span>
                    • គោត្តនាម និងនាមខ្លួន:{" "}
                    <b>
                      {data.full_name_kh}{" "}
                      {data.full_name_eng != null
                        ? " - " + data.full_name_eng
                        : ""}
                    </b>
                    <br /> • លេខអត្តសញ្ញាណប័ណ្ណ: <b>{data.national_id}</b>
                  </span>
                  <br />
                  <span>
                    • ថ្ងៃខែឆ្នាំកំណើត:{" "}
                    <b>{dayjs(data.dob).format("DD-MM-YYYY")} </b>
                    &nbsp;&nbsp;&nbsp;&nbsp;អាយុ: <b>{data.age}</b> ឆ្នាំ
                    &nbsp;&nbsp; ភេទ:{" "}
                    <b>
                      {data.gender === "Male" ? (
                        <>
                          <BiCheckCircle /> ប្រុស
                        </>
                      ) : data.gender === "Female" ? (
                        <>
                          <BiCheckCircle /> ស្រី
                        </>
                      ) : null}
                    </b>
                    &nbsp;&nbsp;&nbsp;&nbsp;• ស្ថានភាពគ្រួសារ:{" "}
                    <b>
                      {data.marital_status === "Single" ? (
                        <>
                          <BiCheckCircle /> នូវលីវ
                        </>
                      ) : data.marital_status === "Married" ? (
                        <>
                          <BiCheckCircle /> រៀបការ
                        </>
                      ) : null}
                    </b>
                  </span>
                  <br />
                  <span>
                    • មុខរបរ: <b>{data.occupation}</b>&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp; • កន្លែងធ្វើការ:{" "}
                    <b>{data.workplace}</b>{" "}
                  </span>
                  <br />
                  <span>
                    • អាសយដ្ឋាន: ផ្ទះលេខ <b>{data.houseNo}</b>, ផ្លូវលេខ{" "}
                    <b>{data.street}</b>, ភូមិ <b>{data.village_kh}</b>,
                    សង្កាត់/ឃុំ <b>{data.commune_kh}</b>, ក្រុង/ស្រុក{" "}
                    <b>{data.city_kh}</b>, <b>{data.province_kh}</b>
                  </span>
                  <br />
                  <span>
                    • លេខទូរស័ព្ទ : <b>{data.phone1 || "............."}</b> /
                    អ៊ីម៉ែល: {data.email1 || "................."}
                  </span>{" "}
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f0f0f0",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                      marginBottom: "10px",
                      width: "100%",
                    }}
                  >
                    <span
                      className="header-text"
                      style={{
                        margin: 0,
                      }}
                    >
                      ការវិនិច្ឆ័យរបស់គ្រូពេទ្យ
                    </span>
                  </div>
                  {!sigle && (
                    <>
                      {dataArray.length === 0 ? (
                        <div
                          className="print-content"
                          style={{ marginBottom: "20px" }}
                        >
                          <div className="donation-box">
                            <span>
                              {" "}
                              <BiCheckCircle />
                              បរិច្ចាគឈាមលើកទី: .......
                            </span>
                          </div>
                          <Row gutter={16}>
                            <Col span={12}>
                              <span>
                                • ថ្ងៃបរិច្ចាគឈាម : ......./...../......
                              </span>
                            </Col>
                            <Col span={12}>
                              <span>• លេខកូដកន្លែង : ..........</span>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={12}>
                              <span>• ទីកន្លែងបរិច្ចាគឈាម : .......</span>
                            </Col>
                            <Col span={12}>
                              <span>• លេខស្បោងឈាម: : ........</span>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={12}>
                              <span>• ទម្ងន់ : ......... គក្រ</span>
                            </Col>
                            <Col span={12}>
                              <span>
                                • អេម៉ូក្លូប៊ីន :......... ក្រាម/១០០មល
                              </span>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={12}>
                              <span>
                                • សម្ពាធឈាម : ....../ ...... មីលីម៉ែត្របារ៉ត
                              </span>
                            </Col>
                            <Col span={12}>
                              <span>• អេម៉ាតូគ្រីត : ........%</span>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={12}>
                              <span>• ជីពចរ : ......... ក្នុង១នាទី</span>
                            </Col>
                            <Col span={12}>
                              <span>
                                • ក្រុមឈាម ABO : ....... រ៉េស៊ីស(RhD):
                                ..........
                              </span>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={6}>
                              <span>• ប្រភេទ:</span>
                            </Col>
                            <Col span={18}>
                              <span>
                                □ SD &nbsp;&nbsp; □ cSD &nbsp;&nbsp; □ ED
                                &nbsp;&nbsp; □ RD
                              </span>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={6}>
                              <span>• ស្បោងឈាម:</span>
                            </Col>
                            <Col span={18}>
                              <span>
                                □ ស្បោងទោល &nbsp;&nbsp; □ ស្បោងភ្លោះ
                                &nbsp;&nbsp; □ ស្បោងភ្លោះ៣
                              </span>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={6}>
                              <span> • ការវិនិច្ឆ័យ: </span>
                            </Col>
                            <Col span={18}>
                              <span>
                                □ អនុញ្ញាតផ្ដល់ឈាម - ចំណុះឈាមត្រូវបូម : ..
                                ...... មីលីលីត្រ
                                <br />□ ហាមផ្ដល់ឈាមមួយរយៈរហូតដល់ថ្ងៃទី{" "}
                                {"..../..../...."}
                                <br />□ ហាមផ្ដល់ឈាមជារៀងរហូត
                              </span>
                              <br />
                              <span>
                                មូលហេតុ: □ អេម៉ូក្លូប៊ីន ឬ អេម៉ាតូគ្រីត / □
                                សម្ពាធឈាម / □ ទម្ងន់ / □ ប្រវត្តិជំងឺ <br />□
                                ស្ថានភាពប្រឈមមុខ / □ អាយុ / □ មុនកាលកំណត់ / □
                                ផ្សេងទៀត <br />
                              </span>
                              <span>
                                • បញ្ហាផ្សេងៗ:
                                .........................................................................
                              </span>
                            </Col>
                          </Row>
                        </div>
                      ) : (
                        dataArray.map((item, index) => (
                          <div
                            key={item.id || index}
                            className="print-content"
                            style={{ marginBottom: "20px" }}
                          >
                            <div
                              className="donation-box"
                              style={{ marginBottom: "5px" }}
                            >
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  marginRight: "12px",
                                }}
                              >
                                <BiCheckCircle /> បរិច្ចាគឈាមលើកទី: {index + 1}
                              </span>
                            </div>
                            <Row gutter={16}>
                              <Col span={12}>
                                <span>
                                  • ថ្ងៃបរិច្ចាគឈាម :
                                  <b>
                                    {" "}
                                    {dayjs(item.donation_date).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </b>
                                </span>
                              </Col>
                              <Col span={12}>
                                <span>
                                  • លេខកូដកន្លែង : ...
                                  <b>{dataDonor?.donator_code}</b>
                                  ...
                                </span>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <span>
                                  • ទីកន្លែងបរិច្ចាគឈាម : ...
                                  <b>{item.donation_place}</b>
                                  ...
                                </span>
                              </Col>
                              <Col span={12}>
                                <span>
                                  • លេខស្បោង: ...<b>{item.place_code}</b>
                                  ...
                                </span>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <span>
                                  • ទម្ងន់ : ...<b>{item.weight_kg}</b>..គក្រ
                                </span>
                              </Col>
                              <Col span={12}>
                                <span>
                                  • អេម៉ូក្លូប៊ីន :<b>{item.hemoglobin}</b>
                                  ក្រាម/១០០មល
                                </span>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <span>
                                  • សម្ពាធឈាម : ....
                                  <b>{item.blood_pressure_systolic}</b>
                                  ../ ..<b>{item.blood_pressure_diastolic}</b>..
                                  មីលីម៉ែត្របារ៉ត
                                </span>
                              </Col>
                              <Col span={12}>
                                <span>
                                  • អេម៉ាតូគ្រីត : ....<b>{item.hematocrit}</b>
                                  ...%
                                </span>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <span>
                                  • ជីពចរ : ...<b>{item.pulse_rate}</b>...
                                  ក្នុង១នាទី
                                </span>
                              </Col>
                              <Col span={12}>
                                <span>
                                  • ក្រុមឈាម ABO : <b>{item.blood_group_abo}</b>{" "}
                                  រ៉េស៊ីស(RhD): <b>{item.rhesus}</b>
                                </span>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={6}>
                                <span>• ប្រភេទ:</span>
                              </Col>
                              <Col span={18}>
                                <span>
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      marginRight: "12px",
                                    }}
                                  >
                                    {isChecked("SD", item.donor_type) ? (
                                      <BiCheckCircle />
                                    ) : (
                                      <BiCircle />
                                    )}{" "}
                                    SD
                                  </span>
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      marginRight: "12px",
                                    }}
                                  >
                                    {isChecked("cSD", item.donor_type) ? (
                                      <BiCheckCircle />
                                    ) : (
                                      <BiCircle />
                                    )}{" "}
                                    cSD
                                  </span>
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      marginRight: "12px",
                                    }}
                                  >
                                    {isChecked("ED", item.donor_type) ? (
                                      <BiCheckCircle />
                                    ) : (
                                      <BiCircle />
                                    )}{" "}
                                    ED
                                  </span>
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                    }}
                                  >
                                    {isChecked("RD", item.donor_type) ? (
                                      <BiCheckCircle />
                                    ) : (
                                      <BiCircle />
                                    )}{" "}
                                    RD
                                  </span>
                                </span>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={6}>
                                <span>• ស្បោងឈាម:</span>
                              </Col>
                              <Col span={18}>
                                <span>
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      marginRight: "12px",
                                    }}
                                  >
                                    {item.blood_bag_type === "single" ? (
                                      <BiCheckCircle />
                                    ) : (
                                      <BiCircle />
                                    )}{" "}
                                    ស្បោងទោល
                                  </span>
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      marginRight: "12px",
                                    }}
                                  >
                                    {item.blood_bag_type === "double" ? (
                                      <BiCheckCircle />
                                    ) : (
                                      <BiCircle />
                                    )}{" "}
                                    ស្បោងភ្លោះ
                                  </span>
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                    }}
                                  >
                                    {item.blood_bag_type === "triple" ? (
                                      <BiCheckCircle />
                                    ) : (
                                      <BiCircle />
                                    )}{" "}
                                    ស្បោងភ្លោះ៣
                                  </span>
                                </span>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={6}>
                                <span>
                                  • <b>ការវិនិច្ឆ័យ:</b>
                                </span>
                              </Col>

                              <Col span={18}>
                                <span
                                  style={{
                                    display: "block",
                                    marginBottom: "4px",
                                  }}
                                >
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      marginRight: "12px",
                                    }}
                                  >
                                    {item.diagnosis_result === "allowed" ? (
                                      <BiCheckCircle />
                                    ) : (
                                      <BiCircle />
                                    )}
                                    អនុញ្ញាតផ្ដល់ឈាម ចំណុះ :
                                    <b>{item.blood_amount_ml} ml</b>
                                  </span>
                                  <br />
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      marginRight: "12px",
                                    }}
                                  >
                                    {item.diagnosis_result ===
                                    "temporary_ban" ? (
                                      <BiCheckCircle />
                                    ) : (
                                      <BiCircle />
                                    )}
                                    ហាមផ្ដល់ឈាមរហូតដល់ថ្ងៃទី:
                                    {item.prohibited_until_date ||
                                      "..../..../...."}
                                  </span>
                                  <br />
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                    }}
                                  >
                                    {item.diagnosis_result ===
                                    "permanent_ban" ? (
                                      <BiCheckCircle />
                                    ) : (
                                      <BiCircle />
                                    )}
                                    ហាមផ្ដល់ឈាមជារៀងរហូត
                                  </span>
                                </span>

                                <span
                                  style={{
                                    display: "block",
                                    marginBottom: "8px",
                                  }}
                                >
                                  <b>មូលហេតុ៖ </b>
                                  {[
                                    {
                                      label: "អេម៉ូក្លូប៊ីន ឬ អេម៉ាតូគ្រីត",
                                      key: "ck_hemoglobin",
                                    },
                                    { label: "សម្ពាធឈាម", key: "ck_pressure" },
                                    { label: "ទម្ងន់", key: "ck_weight" },
                                    {
                                      label: "ប្រវត្តិជំងឺ",
                                      key: "ck_history",
                                    },
                                    {
                                      label: "ស្ថានភាពប្រឈមមុខ",
                                      key: "ck_status",
                                    },
                                    { label: "អាយុ", key: "ck_age" },
                                    { label: "មុនកាលកំណត់", key: "ck_early" },
                                    { label: "ផ្សេងទៀត", key: "ck_other" },
                                  ].map(({ label, key }, index) => (
                                    <span
                                      key={key}
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        marginRight: "12px",
                                      }}
                                    >
                                      {isChecked(key, item.rejection_reason) ? (
                                        <BiCheckCircle />
                                      ) : (
                                        <BiCircle />
                                      )}{" "}
                                      {label}
                                      {index === 3 || index === 6 ? (
                                        <br />
                                      ) : null}
                                    </span>
                                  ))}
                                </span>

                                <span>
                                  • បញ្ហាផ្សេងៗ:
                                  .........................................................................
                                </span>
                              </Col>
                            </Row>
                          </div>
                        ))
                      )}
                    </>
                  )}
                </div>
                {/* Footer */}
                <div
                  className="print-footer"
                  style={{
                    marginTop: "10px",
                    textAlign: "right",
                    paddingTop: "10px",
                  }}
                >
                  <span>ថ្ងៃ……….ខែ……….ឆ្នាំ……….</span>
                  <br />
                  <span style={{ marginRight: "30px", fontWeight: "bold" }}>
                    ហត្ថលេខាគ្រូពេទ្យ
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start", // Change to "center" if you want vertical centering
            }}
          >
            <img
              width={400}
              height={400}
              src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?semt=ais_hybrid&w=740"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
