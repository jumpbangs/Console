import React from 'react';
import { EditSVGIcon } from '@react-md/material-icons';

import { starWars } from 'assets/images';
import Table from 'components/common/table';

/**
 * Location table component.
 *
 * @returns {React.ReactElement}
 */
const LocationTable: React.FC = (): React.ReactElement => {
  const data = [
    {
      name: 'NY 2nd St',
      address: 'Suite 12 2nd St New York',
    },
    {
      name: 'LA Market St',
      address: '331 Market St. Los Angeles Venice',
    },
  ];

  const columns = [
    {
      Header: '',
      id: 'image',
      width: 50,
      Cell: () => {
        return (
          <span className="nametag nametag--lg nametag--table">
            <img src={starWars} alt="logo" />
          </span>
        );
      },
    },
    {
      Header: 'Name',
      accessor: 'name',
      width: 200,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        return <span className="text-bold color-text-blue">{original.name}</span>;
      },
    },
    {
      Header: 'Address',
      accessor: 'address',
      width: 300,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        return <span>{original.address}</span>;
      },
    },
    {
      Header: '',
      id: 'edit',
      width: 36,
      Cell: () => {
        return <EditSVGIcon style={{ fill: '#678EF1' }} />;
      },
    },
  ];

  return <Table columns={columns} data={data} />;
};

export default LocationTable;
