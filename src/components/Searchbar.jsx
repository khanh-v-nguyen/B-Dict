import { useNavigate, useSearchParams } from 'react-router-dom';
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react';
import { SearchOutlined, LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import getTermsQuery from '../utils/getTermsQuery';
import { unpackTermsQuery } from '../utils/unpackQuery';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('term');

  const termsQuery = getTermsQuery();
  const { status: termsStatus, data: terms } = unpackTermsQuery(termsQuery);

  if (termsStatus !== 'success') {
    return (
      <Input
        isInvalid={termsStatus === 'error'}
        isDisabled
        classNames={{ inputWrapper: 'h-[3rem]' }}
        aria-label="searchbar"
        variant="bordered"
        radius="full"
        startContent={
          termsStatus === 'loading' ? (
            <LoadingOutlined />
          ) : (
            <WarningOutlined style={{ color: 'red' }} />
          )
        }
        endContent={<SearchOutlined className="text-xl mt-[-3px]" />}
      />
    );
  }

  const handleSelectionChange = (termid) => {
    if (termid) {
      navigate(`/?term=${terms[termid]}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Autocomplete
      aria-label="searchbar"
      variant="bordered"
      radius="full"
      menuTrigger="input"
      defaultItems={Object.entries(terms)}
      defaultInputValue={searchTerm}
      onSelectionChange={handleSelectionChange}
      classNames={{ selectorButton: 'hidden' }}
      inputProps={{
        classNames: {
          input: 'ml-1',
          inputWrapper: 'h-[3rem]'
        }
      }}
      popoverProps={{
        classNames: {
          content: 'dark:dark'
        }
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: 'transition-opacity'
        }
      }}
      endContent={<SearchOutlined className="text-xl mr-2 mt-[-3px]" />}>
      {([termid, termname]) => (
        <AutocompleteItem key={termid} textValue={termname}>
          <div className="flex gap-2 items-center">
            <div>{termname}</div>
            {/* <div className="truncate">{item.definition}</div> */}
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default Searchbar;
