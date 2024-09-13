import {useState, useEffect} from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

interface FilterListProps {
  initialOptions: Option[];
  selectionType: string;
  onChange: (selected: Option[]) => void;
  max: number;
}

function FilterList({ initialOptions, onChange, selectionType, max }: FilterListProps) {
  const [options, setOptions] = useState<Option[]>(initialOptions);

  // Update options when initialOptions changes
  useEffect(() => {
    setOptions(initialOptions);
  }, [initialOptions]);

  // Handle change event for temporary selection
  const handleTempChange = (selected: Option[]) => {
    if (selected.some(option => option.value === 'select all')) {
      // Update options to disable "select all" and enable others
      setOptions(prevOptions => prevOptions.map(option => (
        option.value === 'select all' ? option : { ...option, disable: true }
      )));
    } else {
      setOptions(initialOptions); // Reset options to initialOptions
    }
    
    onChange(selected); // Propagate selected options up to parent component
  };

  if (selectionType === "Country") {
    max = 6;
  } else {
    max = 6; 
  }

  return (
    <div>
      <MultipleSelector
        options={options}
        hidePlaceholderWhenSelected
        hideClearAllButton={false}
        maxSelected={max}
        placeholder={`Select ${selectionType}`}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400 ">
            no results found.
          </p>
        }
        onChange={handleTempChange}
      />
    </div>
  );
}

export default FilterList;
