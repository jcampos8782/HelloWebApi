package io.jsoncmpos.svc.aws.repositories;

import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

import io.jsoncmpos.svc.aws.models.dao.AwsServiceCatalogItem;

@Repository
public class AwsServiceCatalogRepositoryCsv implements AwsServiceCatalogRepository {

	private static Type type = new TypeToken<List<AwsServiceCatalogItem>>(){}.getType();
	
	private String filename;
	private List<AwsServiceCatalogItem> catalogItems;
	
	@Autowired
	public AwsServiceCatalogRepositoryCsv(@Value("${repository.file}") String filename) {
		this.filename = filename;
	}
	
	@Override
	public AwsServiceCatalogItem load(UUID id) {
		throw new UnsupportedOperationException();
	}

	@Override
	public AwsServiceCatalogItem create(AwsServiceCatalogItem item) {
		throw new UnsupportedOperationException();
	}

	@Override
	public AwsServiceCatalogItem update(AwsServiceCatalogItem item) {
		throw new UnsupportedOperationException();
	}

	@Override
	public boolean delete(AwsServiceCatalogItem item) {
		throw new UnsupportedOperationException();
	}
	
	@Override
	public Collection<AwsServiceCatalogItem> allItems() {
		return catalogItems.stream().collect(Collectors.toCollection(ArrayList::new));
	}
	
	@Override
	public Collection<String> allGroups() {
		return catalogItems.parallelStream().map(i -> i.getGroup()).sorted().distinct().collect(Collectors.toCollection(ArrayList::new));
	}
	
	@Override
	public Collection<AwsServiceCatalogItem> find(Predicate<AwsServiceCatalogItem> predicate) {
		return catalogItems.parallelStream()
				.filter(predicate)
				.collect(Collectors.toCollection(ArrayList::new));
	}

	// Loads the CSV file into memory
	@Override
	@PostConstruct
	public void init() {
		try(var reader = new JsonReader(new InputStreamReader(getClass().getClassLoader().getResourceAsStream(this.filename)))) {
			catalogItems = new Gson().fromJson(reader, type);
		} catch (JsonIOException | JsonSyntaxException | IOException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void close() {
		// No-op
	}
}
