import React from 'react'
import { useSelector } from 'react-redux'
import TenantSelector from '../../../components/cipp/TenantSelector'
import CippDatatable from '../../../components/cipp/CippDatatable'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { Link } from 'react-router-dom'
import { faUser, faCog, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const dropdown = (row, index, column) => {
  return (
    <CDropdown>
      <CDropdownToggle size="sm" variant="ghost" color="primary">
        <FontAwesomeIcon icon={faBars} />
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem href="#">
          <Link className="dropdown-item" to={`/email/administration/edit-contact`}>
            <FontAwesomeIcon icon={faUser} className="me-2" />
            View User
          </Link>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

const columns = [
  {
    name: 'Name',
    selector: 'displayName',
    sortable: true,
  },
  {
    name: 'Default Domain',
    selector: 'defaultDomainName',
  },
  {
    name: 'M365 Portal',
    selector: 'customerId',
    //formatter: linkCog(
    //  (cell) =>
    //    `https://portal.office.com/Partner/BeginClientSession.aspx?CTID=${cell}&CSDEST=o365admincenter`,
    //),
  },
  {
    name: 'Exchange Portal',
    selector: 'defaultDomainName',
    //  formatter: linkCog(
    //  (cell) => `https://outlook.office365.com/ecp/?rfr=Admin_o365&exsvurl=1&delegatedOrg=${cell}`,
    // ),
  },
  {
    name: 'AAD Portal',
    selector: 'defaultDomainName',
    //   formatter: linkCog((cell) => `https://aad.portal.azure.com/${cell}`),
  },
  {
    name: 'Teams Portal',
    selector: 'defaultDomainName',
    //   formatter: linkCog((cell) => `https://admin.teams.microsoft.com/?delegatedOrg=${cell}`),
  },
  {
    name: 'Azure Portal',
    selector: 'defaultDomainName',
    //  formatter: linkCog((cell) => `https://portal.azure.com/${cell}`),
  },
  {
    name: 'MEM (Intune) Portal',
    selector: 'defaultDomainName',
    //   formatter: linkCog((cell) => `https://endpoint.microsoft.com/${cell}`),
  },
  {
    name: 'Action',
    cell: dropdown,
  },

  // @todo not used at the moment?
  // {
  //   name: 'Domains',
  //   selector: 'defaultDomainName',
  // },
]

const ContactsList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <div>
      <TenantSelector />
      <hr />
      <div className="bg-white rounded p-5">
        <h3>Contacts List</h3>
        {Object.keys(tenant).length === 0 && <span>Select a tenant to get started.</span>}
        <CippDatatable
          keyField="id"
          reportName={`${tenant?.defaultDomainName}-Contacts`}
          path="/api/ListContacts"
          columns={columns}
          params={{ TenantFilter: tenant?.defaultDomainName }}
        />
      </div>
    </div>
  )
}

export default ContactsList