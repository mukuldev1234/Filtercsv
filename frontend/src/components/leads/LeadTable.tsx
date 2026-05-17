import EditLeadModal from "./EditLeadModal";

import type { Lead } from "../../types/lead.types";

interface Props {
  leads: Lead[];

  deleteLead: (
    id: string
  ) => void;

  fetchLeads: () => void;
}

const LeadTable = ({
  leads,
  deleteLead,
  fetchLeads,
}: Props) => {
  return (
    <div className="table-wrapper">
      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>

            <th>Email</th>

            <th>Status</th>

            <th>Source</th>

            <th>Created</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>

              <td>{lead.email}</td>

              <td>
                <span className="status-badge">
                  {lead.status}
                </span>
              </td>

              <td>
                <span className="source-badge">
                  {lead.source}
                </span>
              </td>

              <td>
                {new Date(
                  lead.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="action-buttons">
                <EditLeadModal
                  lead={lead}
                  fetchLeads={
                    fetchLeads
                  }
                />

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteLead(
                      lead._id
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;