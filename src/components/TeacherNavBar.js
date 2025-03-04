import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import RouteConstants from "../constants/RouteConstants";
import { UserContext } from "../context/User/UserContext";
import { ThemeContext } from "../context/Theme/ThemeContext";
import { Col, Container, Row } from "react-bootstrap";
import cx from "classnames";
import RoleConstants from "../constants/RoleConstants";

const TeacherNavBar = () => {
  const { logOut } = useContext(UserContext);
  const { primaryColor, bgColor, btnColor } = useContext(ThemeContext);
  let navigate = useNavigate();
  const [routeLinkData, setRouteLinkData] = useState([
    {
      title: "Home",
      link: RouteConstants.TEACHER_DASHBOARD,
      iconName: "fa-solid fa-house-chimney",
    },
    {
      title: "Subjects",
      link: RouteConstants.TEACHER_SUBJECTS,
      iconName: "fa-solid fa-book",
    },
    {
      title: "Profile",
      link: RouteConstants.TEACHER_PROFILE,
      iconName: "fa-solid fa-user",
      // { title: "Feedback", link: RouteConstants.TEACHER_FEEDBACK, iconName: "fa-solid fa-file" },
      // { title: "Users", link: RouteConstants.TEACHER_STUDENT, iconName: "fa-solid fa-users" },
      // { title: "Queries", link: RouteConstants.TEACHER_QUERIES, iconName: "fa-regular fa-question" },
    },
  ]);

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("user"))?.userRole ===
        RoleConstants.ADMIN ||
      JSON.parse(localStorage.getItem("user"))?.canCreateBatch
    ) {
      setRouteLinkData((routeLinkData) => [
        ...routeLinkData,
        {
          title: "Batch",
          link: RouteConstants.TEACHER_BATCH,
          iconName: "fa-solid fa-calendar-plus",
        },
      ]);
    }
    if (
      JSON.parse(localStorage.getItem("user"))?.userRole === RoleConstants.ADMIN
    ) {
      setRouteLinkData((routeLinkData) => [
        ...routeLinkData,
        {
          title: "Permissions",
          link: RouteConstants.TEACHER_PERMISSION,
          iconName: "fa-solid fa-cog",
        },
        {
          title: "Settings",
          link: RouteConstants.TEACHER_SETTINGS,
          iconName: "fa-solid fa-cog",
        },
      ]);
    }
  }, []);

  const [active, setActive] = useState(window.location.pathname);

  const GridComp = () => {
    const linkStyles = {
      textDecoration: "none",
      color: btnColor,
    };
    return (
      <Container fluid className="shadow p-0">
        <Row>
          {routeLinkData.map((item, key) => {
            return (
              <Col key={key}>
                <Link
                  to={item.link}
                  onClick={(e) => {
                    if (active === item.link) e.preventDefault();
                    else {
                      setActive(item.link);
                    }
                  }}
                  style={{
                    ...linkStyles,
                    backgroundColor: active === item.link ? "#E0E3EA" : "white",
                    cursor: active === item.link ? "not-allowed" : "pointer",
                  }}
                  className="d-flex justify-content-center align-items-center p-4 px-0 border border-top-0 border-1"
                >
                  <span className="d-flex flex-column gap-2 fa-xl">
                    <i
                      className={cx(
                        item.iconName,
                        "d-flex justify-content-center align-items-center"
                      )}
                    />
                    <h5 className="fw-600">{item.title}</h5>
                  </span>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  };

  return (
    <>
      <GridComp />
    </>
  );
};

export default TeacherNavBar;
