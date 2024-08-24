import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Typography, Image } from "antd";

const { Title, Paragraph } = Typography;
function App() {
  const { id } = useParams(); // Get the ID from the URL
  const [list, setList] = useState([]);

  const getList = async () => {
    try {
      const res = await fetch(
        `https://reportapi.devcomputing.pro/api/usernameid/${id}`
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data = await res.json();
      console.log(data);
      setList(data.GetOneRecord || []); // Adjust according to your API response structure
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getList();
    }
  }, [id]); // Fetch data when `id` changes

  return (
    <div>
      {list.map((user) => (
        <div
          style={{
            padding: "20px",
            marginTop: "100px",
            display: "flex",
            borderRadius: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {user && (
            <Card
              style={{ width: 600 }}
              cover={
                <Image
                  alt="staff-member"
                  src="https://placehold.co/400x250/FF0000/FFFFFF?text=Staff+Member"
                  preview={false}
                  style={{
                    height: "250px",
                    borderStartEndRadius: "10px",
                    borderStartStartRadius: "10px",

                    objectFit: "cover",
                  }}
                />
              }
            >
              <Title
                level={2}
              >{`ឈ្មោះ ៖ ${user.frontname} ${user.fullname}`}</Title>
              <Paragraph>{`ផ្នែក​ ៖​ ${user.department}`}</Paragraph>
              <Paragraph>{`តួនារទី ៖ ${user.position}`}</Paragraph>
              <Paragraph>{`អត្ថលេខមន្ត្រី ៖​ ${user.idnumber}`}</Paragraph>
              <Paragraph>{`លេខទូរស័ព្ទ ៖​ ${user.username}`}</Paragraph>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 16,
                }}
              >
                <a href="#" style={{ color: "#1890ff" }}>
                  View Profile
                </a>
                <Button type="primary">Contact</Button>
              </div>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
