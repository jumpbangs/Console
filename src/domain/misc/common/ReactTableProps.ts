interface ReactTableProps {
  data: any[];
  columns: any[];
  onNext?: () => void;
  isLoading?: boolean;
  hasMoreNext?: boolean;
  onPrevious?: () => void;
  hasMorePrevious?: boolean;
  isFilterVisible?: boolean;
  onRowClick?: (props: any) => void;
  buttonHandler?: (props: any) => void;
}

export default ReactTableProps;
