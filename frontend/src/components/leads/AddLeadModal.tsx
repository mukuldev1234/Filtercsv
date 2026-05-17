import {
  useState,
} from "react";

import api from "../../api/axios";

interface Props {
  fetchLeads: () => void;
}

const AddLeadModal = ({
  fetchLeads,
}: Props) => {
  const [isOpen, setIsOpen] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [status, setStatus] =
    useState("NEW");

  const [source, setSource] =
    useState("WEBSITE");

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await api.post(
          "/leads",
          {
            name,
            email,
            status,
            source,
          }
        );

        fetchLeads();

        setName("");

        setEmail("");

        setStatus("NEW");

        setSource("WEBSITE");

        setIsOpen(false);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <button
        className="primary-btn"
        onClick={() =>
          setIsOpen(true)
        }
      >
        Add Lead
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">
              Add New Lead
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
            >
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
                required
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
                required
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
                  type="submit"
                  className="primary-btn"
                >
                  Add Lead
                </button>

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    setIsOpen(
                      false
                    )
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddLeadModal;