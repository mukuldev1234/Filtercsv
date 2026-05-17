import {
  useEffect,
  useState,
} from "react";

import { CSVLink } from "react-csv";

import api from "../api/axios";

import type { Lead } from "../types/lead.types";

import AddLeadModal from "../components/leads/AddLeadModal";

import LeadFilters from "../components/leads/LeadFilters";

import LeadTable from "../components/leads/LeadTable";

const Dashboard = () => {
  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [source, setSource] =
    useState("");

  const [sort, setSort] =
    useState("latest");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/leads?page=${page}&search=${search}&status=${status}&source=${source}&sort=${sort}`
      );

      setLeads(res.data.leads);

      setTotalPages(
        res.data.totalPages
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 500);

    return () =>
      clearTimeout(timer);
  }, [
    search,
    status,
    source,
    sort,
    page,
  ]);

  const deleteLead = async (
    id: string
  ) => {
    try {
      await api.delete(
        `/leads/${id}`
      );

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    window.location.href = "/";
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}

      <div className="sidebar">
        <h1 className="sidebar-title">
          Smart Leads
        </h1>

        <ul className="sidebar-menu">
          <li>Dashboard</li>

          <li onClick={logout}>
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}

      <div className="main-content">
        {/* Navbar */}

        <div className="navbar">
          <h2 className="text-xl font-bold">
            Leads Dashboard
          </h2>

          <div className="flex gap-4">
            <CSVLink
              data={leads}
              filename="leads.csv"
              className="primary-btn w-auto px-4"
            >
              Export CSV
            </CSVLink>

            <AddLeadModal
              fetchLeads={
                fetchLeads
              }
            />
          </div>
        </div>

        {/* Page Content */}

        <div className="page-content">
          {/* Filters */}

          <LeadFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            source={source}
            setSource={setSource}
            sort={sort}
            setSort={setSort}
          />

          {/* Loading */}

          {loading ? (
            <div className="loader-container">
              <h1 className="loader-text">
                Loading...
              </h1>
            </div>
          ) : leads.length === 0 ? (
            <div className="empty-state">
              No Leads Found
            </div>
          ) : (
            <LeadTable
              leads={leads}
              deleteLead={
                deleteLead
              }
              fetchLeads={
                fetchLeads
              }
            />
          )}

          {/* Pagination */}

          <div className="flex gap-4 mt-6">
            <button
              disabled={page === 1}
              className="primary-btn"
              onClick={() =>
                setPage(page - 1)
              }
            >
              Prev
            </button>

            <button className="primary-btn">
              {page} / {totalPages}
            </button>

            <button
              disabled={
                page === totalPages
              }
              className="primary-btn"
              onClick={() =>
                setPage(page + 1)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;