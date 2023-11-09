from dataclasses import dataclass
from typing import Optional, Iterable


@dataclass
class ExampleParseError:
    file: Optional[str] = None
    id: Optional[str] = None
    language: Optional[str] = None
    sdk_version: Optional[int] = None

    def prefix(self):
        prefix = f"In {self.file}, example {self.id}"
        if self.language:
            prefix += f": {self.language}"
        if self.sdk_version:
            prefix += f": {self.sdk_version}"
        return prefix

    def message(self):
        pass

    def __str__(self):
        return f"{self.prefix} {self.message()}"


@dataclass
class LanguageError(ExampleParseError):
    language: str = ""

    def prefix(self):
        return super().prefix() + f": {self.language}"


class ExampleErrors:
    """MyPy isn't catching list[Foo].append(list[Foo])"""

    def __init__(self):
        self._errors: list[ExampleParseError] = []

    def append(self, item: ExampleParseError):
        if not isinstance(item, ExampleParseError):
            raise Exception(
                f"InvalidItemException: Cannot append {item!r} to ExampleErrors"
            )
        if item in self._errors:
            raise Exception(f"Already have error {item}")
        self._errors.append(item)

    def extend(self, errors: Iterable[ExampleParseError]):
        self._errors.extend(errors)

    def __getitem__(self, key: int) -> ExampleParseError:
        return self._errors[key]

    def __setitem__(self, key: int, value: ExampleParseError):
        self._errors[key] = value

    def __len__(self) -> int:
        return len(self._errors)

    def __repr__(self) -> str:
        return repr(self._errors)

    def __str__(self) -> str:
        return f"ExampleErrors with {len(self)} errors"


@dataclass
class NamePrefixMismatch(ExampleParseError):
    def message(self):
        return "name prefix does not match any known service."


@dataclass
class NameFormat(ExampleParseError):
    def message(self):
        return "name does not match the required format of 'svc_Operation', 'svc_Operation_Specialization', or 'cross_Title'"


@dataclass
class MissingField(ExampleParseError):
    field: str = ""

    def message(self):
        return f"missing field {self.field}"


@dataclass
class AwsNotEntity(ExampleParseError):
    field_name: str = ""
    field_value: str = ""

    def message(self):
        return f"field {self.field_name} is '{self.field_value}', which contains a usage of 'AWS' that is not an entity. All uses of 'AWS' must be entities: '&AWS;'."


@dataclass
class LanguagesEmptyError(ExampleParseError):
    def message(self):
        return "does not contain any languages."


@dataclass
class UnknownLanguage(LanguageError):
    def message(self):
        return f"contains {self.language} as a language, which is not valid."


@dataclass
class MissingBlockContent(LanguageError):
    block_content: str = ""

    def message(self):
        return f"block_content {self.block_content} was not found in the cross-contents folder."


@dataclass
class BlockContentAndExcerptConflict(LanguageError):
    def message(self):
        return "contains both block_content and excerpt data. You cannot use both."


@dataclass
class MissingBlockContentAndExcerpt(LanguageError):
    def message(self):
        return "must contain either block_content or excerpt data."


@dataclass
class SdkVersionError(LanguageError):
    sdk_version: str = ""

    def prefix(self):
        return super().prefix() + f": {self.sdk_version}"


@dataclass
class InvalidSdkVersion(SdkVersionError):
    def message(self):
        return "lists version {self.sdk_version} which is not listed in sdks.yaml."


@dataclass
class InvalidGithubLink(SdkVersionError):
    link: str = ""

    def message(self):
        return f"has link {self.link}, which looks like a file. Links to Github should be to the folder that contains the README that describes the example."


@dataclass
class InvalidSdkGuideStart(SdkVersionError):
    guide: str = ""

    def message(self):
        return (
            f"contains an sdkguide link of '{self.guide}'. Use a relative link instead and let the tool insert a 'type=documentation' attribute in the link on your behalf.",
        )


@dataclass
class APIExampleCannotAddService(SdkVersionError):
    def message(self):
        return (
            "is an API example but lists additional services in the add_service field."
        )


@dataclass
class MissingSnippetTag(SdkVersionError):
    tag: str = ""

    def message(self):
        return f" excerpt {self.tag} not found in the snippets folder."


@dataclass
class UnknownService(ExampleParseError):
    service: str = ""

    def message(self):
        return f"has unknown service {self.service}"


@dataclass
class DuplicateService(ExampleParseError):
    services: str = ""

    def message(self):
        return f"service {self.services} listed more than once"


@dataclass
class DuplicateExample(ExampleParseError):
    other_file: str = ""

    def message(self):
        return f"also found in {self.other_file}"


@dataclass
class URLMissingTitle(SdkVersionError):
    url: str = str

    def message(self):
        return f"URL {self.url} is missing a title"


# type mappingFieldEmptyError struct {
# field string
# }

# func (err *mappingFieldEmptyError) Error() string {
# return fmt.Sprintf("Mapping field is empty: %v.", err.field)
# }

# type mappingFieldMustBeEntityError struct {
# field      string
# fieldValue string
# }

# func (err *mappingFieldMustBeEntityError) Error() string {
# return fmt.Sprintf("Mapping field %v with value %v must be an entity.",
#     err.field, err.fieldValue)
# }

# type mappingFieldNonEntityAwsError struct {
# field      string
# fieldValue string
# }

# func (err *mappingFieldNonEntityAwsError) Error() string {
# return fmt.Sprintf("Mapping field %v contains non-entity usage of AWS: %v", err.field, err.fieldValue)
# }
