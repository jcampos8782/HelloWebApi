package io.jsoncmpos.svc.aws.services;

import java.util.Collection;

import io.jsoncmpos.svc.aws.models.dao.AwsServiceCatalogItem;

public interface AwsServiceCatalogSearchService {
	public Collection<AwsServiceCatalogItem> findCatalogItemsByGroup(String group);
	public AwsServiceCatalogItem findCatalogItemByName(String name);
	public AwsServiceCatalogItem findCatalogItemByAcronym(String acronym);
	public Collection<AwsServiceCatalogItem> findCatalogItems(String searchText);
}
