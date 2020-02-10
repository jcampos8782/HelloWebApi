package io.jsoncmpos.svc.aws.services;

import java.util.Collection;

import io.jsoncmpos.svc.aws.models.dao.AwsServiceCatalogItem;

public interface AwsServiceCatalogService {
	public Collection<AwsServiceCatalogItem> getAll();
	public Collection<String> getGroups();
}
