import { JobsQueryParams } from "@/hooks/useJobs";

export function parseJobsQueryParams(
  searchParams: URLSearchParams,
): JobsQueryParams {
  const params: JobsQueryParams = {};

  const page = searchParams.get("page");
  if (page) params.page = Number(page);

  const search = searchParams.get("search");
  if (search) params.search = search;

  const category = searchParams.get("category");
  if (category) params.category = category;

  const type = searchParams.get("type");
  if (type) params.type = type;

  const locationType = searchParams.get("locationType");
  if (locationType) params.locationType = locationType;

  const location = searchParams.get("location");
  if (location) params.location = location;

  const minSalary = searchParams.get("minSalary");
  if (minSalary) params.minSalary = Number(minSalary);

  const maxSalary = searchParams.get("maxSalary");
  if (maxSalary) params.maxSalary = Number(maxSalary);

  const sort = searchParams.get("sort");
  if (sort) params.sort = sort;

  return params;
}
