interface Props {
  search: string;

  setSearch: (
    value: string
  ) => void;

  status: string;

  setStatus: (
    value: string
  ) => void;

  source: string;

  setSource: (
    value: string
  ) => void;

  sort: string;

  setSort: (
    value: string
  ) => void;
}

const LeadFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  source,
  setSource,
  sort,
  setSort,
}: Props) => {
  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      {/* Search */}

      <input
        type="text"
        placeholder="Search by name or email"
        className="input-field"
        value={search}
        onChange={(e) =>
          setSearch(
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
        <option value="">
          All Status
        </option>

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
        <option value="">
          All Source
        </option>

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

      {/* Sorting */}

      <select
        className="input-field"
        value={sort}
        onChange={(e) =>
          setSort(
            e.target.value
          )
        }
      >
        <option value="latest">
          Latest
        </option>

        <option value="oldest">
          Oldest
        </option>
      </select>
    </div>
  );
};

export default LeadFilters;