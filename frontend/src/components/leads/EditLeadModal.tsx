import {
  useState,
} from "react";

import api from "../../api/axios";

import type { Lead } from "../../types/lead.types";

interface Props {
  lead: Lead;

  fetchLeads: () => void;
}

const EditLeadModal = ({
  lead,
  fetchLeads,
}: Props) => {
  const [isOpen, setIsOpen] =
    useState(false);

  const [name, setName] =
    useState(lead.name);

  const [email, setEmail] =
    useState(lead.email);

  const [status, setStatus] =
    useState(lead.status);

  const [source, setSource] =
    useState(lead.source);

  const handleUpdate =
    async () => {
      try {
        await api.put(
          `/leads/${lead._id}`,
          {
            name,
            email,
            status,
            source,
          }
        );

        fetchLeads();

        setIsOpen(false);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <button
        className="edit-btn"
        onClick={() =>
          setIsOpen(true)
        }
      >
        Edit
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">
              Edit Lead
            </h2>

            {/* Name */}

            <input
              type="text"
              placeholder="Name"
              className="input-field"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            {/* Email */}

            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            {/* Status */}

            <select
              className="input-field"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >
              <option value="NEW">
                NEW
              </option>

              <option value="CONTACTED">
                CONTACTED
              </option>

              <option value="QUALIFIED">
                QUALIFIED
              </option>

              <option value="LOST">
                LOST
              </option>
            </select>

            {/* Source */}

            <select
              className="input-field"
              value={source}
              onChange={(e) =>
                setSource(
                  e.target.value
                )
              }
            >
              <option value="WEBSITE">
                WEBSITE
              </option>

              <option value="INSTAGRAM">
                INSTAGRAM
              </option>

              <option value="REFERRAL">
                REFERRAL
              </option>
            </select>

            {/* Buttons */}

            <div className="flex gap-4 mt-4">
              <button
                className="primary-btn"
                onClick={
                  handleUpdate
                }
              >
                Update
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditLeadModal;